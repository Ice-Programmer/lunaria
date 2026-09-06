use crate::db::{self, Db};
use crate::entity::project;
use crate::error::{AppError, AppResult};
use crate::repository::project_repository::{self, NewProject};
use crate::state::project_state::{CurrentProject, ProjectState};
use crate::util::{file::ensure_dir, time::current_timestamp};
use sea_orm::{ActiveModelTrait, EntityTrait, IntoActiveModel, Set};
use std::{path::Path, sync::Arc};

async fn find_registered_project(
    app_db: &Db,
    directory: &Path,
) -> AppResult<Option<project::Model>> {
    let canonical_path = directory.to_string_lossy();
    if let Some(project) = project_repository::find_by_path(app_db, canonical_path.as_ref()).await?
    {
        return Ok(Some(project));
    }

    for project in project::Entity::find().all(app_db).await? {
        if Path::new(&project.project_path)
            .canonicalize()
            .is_ok_and(|path| path == directory)
        {
            return Ok(Some(project));
        }
    }
    Ok(None)
}

pub async fn create_project(
    app_db: &Db,
    state: &ProjectState,
    project_name: String,
    project_path: String,
) -> AppResult<project::Model> {
    let mut current = state.current.lock().await;
    ensure_dir(&project_path)
        .await
        .map_err(|source| AppError::ProjectDirectoryCreationFailed {
            project_path: project_path.clone(),
            source,
        })?;
    let directory = Path::new(&project_path).canonicalize()?;
    let project_path = directory.to_string_lossy().to_string();
    if find_registered_project(app_db, &directory).await?.is_some() {
        return Err(AppError::ProjectPathAlreadyRegistered { project_path });
    }
    let created_at = current_timestamp()?;
    let db = db::create_project_database(&directory, &project_name, created_at).await?;
    let project = project_repository::insert(
        app_db,
        NewProject {
            project_name,
            project_path,
            created_at,
            last_opened_at: created_at,
        },
    )
    .await?;
    *current = Some(Arc::new(CurrentProject {
        db,
        info: project.clone(),
    }));
    Ok(project)
}

pub async fn open_project(
    app_db: &Db,
    state: &ProjectState,
    project_path: String,
) -> AppResult<project::Model> {
    let mut current = state.current.lock().await;
    let directory = Path::new(&project_path).canonicalize()?;
    let canonical_path = directory.to_string_lossy().to_string();
    let registered = find_registered_project(app_db, &directory).await?;
    let (db, metadata) = db::open_project_database(&directory).await?;
    let now = current_timestamp()?;
    let project = if let Some(record) = registered {
        let mut record = record.into_active_model();
        record.project_name = Set(metadata.project_name);
        record.project_path = Set(canonical_path);
        record.created_at = Set(metadata.created_at);
        record.last_opened_at = Set(now);
        record.update(app_db).await?
    } else {
        project_repository::insert(
            app_db,
            NewProject {
                project_name: metadata.project_name,
                project_path: canonical_path,
                created_at: metadata.created_at,
                last_opened_at: now,
            },
        )
        .await?
    };
    *current = Some(Arc::new(CurrentProject {
        db,
        info: project.clone(),
    }));
    Ok(project)
}

pub async fn fetch_latest_opened_project(app_db: &Db) -> AppResult<Option<project::Model>> {
    Ok(project_repository::find_latest_opened(app_db).await?)
}

pub async fn query_recent_opened_project(app_db: &Db, num: u64) -> AppResult<Vec<project::Model>> {
    Ok(project_repository::find_recent_opened(app_db, num).await?)
}
