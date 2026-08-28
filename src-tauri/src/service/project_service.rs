use crate::entity::project;
use crate::error::{AppError, AppResult};
use crate::util::file::ensure_dir;
use crate::util::time::current_timestamp;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter, QueryOrder, Set,
};

pub async fn create_project(
    db: &DatabaseConnection,
    project_name: String,
    project_path: String,
) -> AppResult<project::Model> {
    let created_at = current_timestamp()?;

    let registered_project = project::Entity::find()
        .filter(project::Column::ProjectPath.eq(&project_path))
        .one(db)
        .await?;

    if registered_project.is_some() {
        return Err(AppError::ProjectPathAlreadyRegistered { project_path });
    }

    ensure_dir(&project_path)
        .await
        .map_err(|source| AppError::ProjectDirectoryCreationFailed {
            project_path: project_path.clone(),
            source,
        })?;

    let project = project::ActiveModel {
        project_name: Set(project_name),
        project_path: Set(project_path),
        created_at: Set(created_at),
        last_opened_at: Set(created_at),
        ..Default::default()
    };

    Ok(project.insert(db).await?)
}

pub async fn fetch_latest_opened_project(
    db: &DatabaseConnection,
) -> AppResult<Option<project::Model>> {
    let project = project::Entity::find()
        .order_by_desc(project::Column::LastOpenedAt)
        .one(db)
        .await?;

    Ok(project)
}
