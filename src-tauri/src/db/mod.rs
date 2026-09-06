use crate::{
    entity::{character, character_sprite, character_sprite_set, project, project_meta},
    error::{AppError, AppResult},
};
use sea_orm::{
    ActiveModelTrait, ConnectOptions, ConnectionTrait, Database, DatabaseConnection, DbBackend,
    EntityTrait, QuerySelect, QueryTrait, Schema, Set, Statement, TransactionTrait,
};
use std::{path::Path, time::Duration};
use tempfile::{NamedTempFile, TempPath};

const SCHEMA_VERSION: i64 = 1;
const APPLICATION_ID: i64 = 0x4c554e41;
const PROJECT_DATABASE: &str = "lunaria.db";

pub type Db = DatabaseConnection;

pub async fn init_db(app_data_dir: &Path) -> AppResult<Db> {
    tokio::fs::create_dir_all(app_data_dir).await?;
    open_app_database(app_data_dir).await
}

async fn connect(path: &Path) -> AppResult<Db> {
    let path = path.to_path_buf();
    let mut options = ConnectOptions::new("sqlite::memory:");
    options
        .max_connections(1)
        .sqlx_logging(false)
        .map_sqlx_sqlite_opts(move |options| {
            options
                .filename(&path)
                .in_memory(false)
                .shared_cache(false)
                .create_if_missing(false)
                .foreign_keys(true)
                .busy_timeout(Duration::from_secs(5))
        });
    Ok(Database::connect(options).await?)
}

async fn create_table<C: ConnectionTrait, E: EntityTrait>(db: &C, entity: E) -> AppResult<()> {
    let schema = Schema::new(db.get_database_backend());
    let mut table = schema.create_table_from_entity(entity);
    db.execute(table.if_not_exists()).await?;
    for mut index in schema.create_index_from_entity(entity) {
        db.execute(index.if_not_exists()).await?;
    }
    Ok(())
}

async fn open_app_database(directory: &Path) -> AppResult<Db> {
    let destination = directory.join("app.db");
    if !destination.exists() {
        let temporary = NamedTempFile::new_in(directory)?.into_temp_path();
        let db = connect(&temporary).await?;
        let result: AppResult<()> = async {
            let txn = db.begin().await?;
            create_table(&txn, project::Entity).await?;
            txn.execute_unprepared(&format!("PRAGMA user_version = {SCHEMA_VERSION}"))
                .await?;
            txn.commit().await?;
            Ok(())
        }
        .await;
        db.close().await?;
        result?;
        publish(temporary, &destination)?;
    }
    let app = connect(&destination).await?;
    if integer(&app, "PRAGMA user_version").await? != SCHEMA_VERSION {
        app.close().await?;
        return Err(AppError::ProjectDatabaseVersionUnsupported);
    }
    Ok(app)
}

pub async fn create_project_database(
    directory: &Path,
    name: &str,
    created_at: i64,
) -> AppResult<Db> {
    let destination = directory.join(PROJECT_DATABASE);
    if destination.exists() {
        return Err(AppError::ProjectDatabaseAlreadyExists);
    }
    let temporary = NamedTempFile::new_in(directory)?.into_temp_path();
    let db = connect(&temporary).await?;
    let result: AppResult<()> = async {
        let txn = db.begin().await?;
        create_table(&txn, project_meta::Entity).await?;
        create_table(&txn, character::Entity).await?;
        create_table(&txn, character_sprite_set::Entity).await?;
        create_table(&txn, character_sprite::Entity).await?;
        project_meta::ActiveModel {
            id: Set(1),
            project_name: Set(name.to_owned()),
            created_at: Set(created_at),
        }
        .insert(&txn)
        .await?;
        txn.execute_unprepared(&format!(
            "PRAGMA application_id = {APPLICATION_ID}; PRAGMA user_version = {SCHEMA_VERSION};"
        ))
        .await?;
        check_integrity(&txn).await?;
        txn.commit().await?;
        Ok(())
    }
    .await;
    db.close().await?;
    result?;
    publish(temporary, &destination)?;
    connect(&destination).await
}

pub async fn open_project_database(directory: &Path) -> AppResult<(Db, project_meta::Model)> {
    let destination = directory.join(PROJECT_DATABASE);
    if !destination.exists() {
        return Err(AppError::ProjectDatabaseNotFound);
    }
    let db = connect(&destination).await?;
    match project_metadata(&db).await {
        Ok(metadata) => Ok((db, metadata)),
        Err(error) => {
            db.close().await?;
            Err(error)
        }
    }
}

async fn project_metadata(db: &Db) -> AppResult<project_meta::Model> {
    if integer(db, "PRAGMA application_id").await? != APPLICATION_ID {
        return Err(AppError::InvalidProjectDatabase);
    }
    if integer(db, "PRAGMA user_version").await? != SCHEMA_VERSION {
        return Err(AppError::ProjectDatabaseVersionUnsupported);
    }
    let metadata = project_meta::Entity::find_by_id(1)
        .one(db)
        .await
        .map_err(|_| AppError::InvalidProjectDatabase)?
        .ok_or(AppError::InvalidProjectDatabase)?;
    let backend = db.get_database_backend();
    for query in [
        character::Entity::find().limit(0).build(backend),
        character_sprite_set::Entity::find().limit(0).build(backend),
        character_sprite::Entity::find().limit(0).build(backend),
    ] {
        db.query_all_raw(query)
            .await
            .map_err(|_| AppError::InvalidProjectDatabase)?;
    }
    check_integrity(db).await?;
    Ok(metadata)
}

async fn integer<C: ConnectionTrait>(db: &C, sql: &str) -> AppResult<i64> {
    let row = db
        .query_one_raw(Statement::from_string(DbBackend::Sqlite, sql))
        .await?
        .ok_or(AppError::InvalidProjectDatabase)?;
    Ok(row.try_get_by_index(0)?)
}

async fn check_integrity<C: ConnectionTrait>(db: &C) -> AppResult<()> {
    let rows = db
        .query_all_raw(Statement::from_string(
            DbBackend::Sqlite,
            "PRAGMA integrity_check",
        ))
        .await?;
    if rows.len() != 1 || rows[0].try_get_by_index::<String>(0)? != "ok" {
        return Err(AppError::InvalidProjectDatabase);
    }
    if !db
        .query_all_raw(Statement::from_string(
            DbBackend::Sqlite,
            "PRAGMA foreign_key_check",
        ))
        .await?
        .is_empty()
    {
        return Err(AppError::InvalidProjectDatabase);
    }
    Ok(())
}

fn publish(temporary: TempPath, destination: &Path) -> AppResult<()> {
    // Persist a complete database without replacing an existing project file.
    std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .open(&temporary)?
        .sync_all()?;
    temporary
        .persist_noclobber(destination)
        .map_err(|error| AppError::Io(error.error))?;
    Ok(())
}

#[cfg(test)]
mod tests;
