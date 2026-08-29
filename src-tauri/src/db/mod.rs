use crate::{entity::project, entity::character, error::AppResult};
use sea_orm::{ConnectionTrait, Database, DatabaseConnection, Schema};
use std::path::Path;

pub type Db = DatabaseConnection;

pub async fn init_db(app_data_dir: &Path) -> AppResult<Db> {
    tokio::fs::create_dir_all(app_data_dir).await?;

    let db_path = app_data_dir.join("lunaria.db");

    let database_url = format!("sqlite://{}?mode=rwc", db_path.to_string_lossy());

    let db = Database::connect(&database_url).await?;

    create_tables(&db).await?;

    Ok(db)
}

async fn create_tables(db: &Db) -> AppResult<()> {
    let schema = Schema::new(db.get_database_backend());

    let mut tables = [
        schema.create_table_from_entity(project::Entity),
        schema.create_table_from_entity(character::Entity),
    ];

    for table in &mut tables {
        table.if_not_exists();
        db.execute(table).await?;
    }

    Ok(())
}
