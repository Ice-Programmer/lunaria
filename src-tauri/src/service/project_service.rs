use crate::entity::project;
use crate::error::AppError;
use crate::util::file::ensure_dir;
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};

pub async fn create_project(
    db: &DatabaseConnection,
    project_name: String,
    filepath: String,
) -> Result<project::Model, AppError> {
    let created_at = current_timestamp()?;

    ensure_dir(&filepath).await?;

    let project = project::ActiveModel {
        project_name: Set(project_name),
        project_path: Set(filepath),
        created_at: Set(created_at),
        last_opened_at: Set(created_at),
        ..Default::default()
    };

    Ok(project.insert(db).await?)
}
