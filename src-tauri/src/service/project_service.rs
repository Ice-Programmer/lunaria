use crate::entity::project;
use crate::error::{AppError, AppResult};
use crate::repository::project_repository::{self, NewProject};
use crate::util::file::ensure_dir;
use crate::util::time::current_timestamp;
use sea_orm::DatabaseConnection;

pub async fn create_project(
    db: &DatabaseConnection,
    project_name: String,
    project_path: String,
) -> AppResult<project::Model> {
    let created_at = current_timestamp()?;

    let registered_project = project_repository::find_by_path(db, &project_path).await?;

    if registered_project.is_some() {
        return Err(AppError::ProjectPathAlreadyRegistered { project_path });
    }

    ensure_dir(&project_path)
        .await
        .map_err(|source| AppError::ProjectDirectoryCreationFailed {
            project_path: project_path.clone(),
            source,
        })?;

    let project = project_repository::insert(
        db,
        NewProject {
            project_name,
            project_path,
            created_at,
            last_opened_at: created_at,
        },
    )
    .await?;

    Ok(project)
}

pub async fn fetch_latest_opened_project(
    db: &DatabaseConnection,
) -> AppResult<Option<project::Model>> {
    Ok(project_repository::find_latest_opened(db).await?)
}

pub async fn query_recent_opened_project(
    db: &DatabaseConnection,
    num: u64,
) -> AppResult<Vec<project::Model>> {
    Ok(project_repository::find_recent_opened(db, num).await?)
}
