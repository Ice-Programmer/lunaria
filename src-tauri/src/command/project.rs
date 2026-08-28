use crate::{db::Db, entity::project, error::AppResult, service::project_service};
use tauri::State;

#[tauri::command]
pub async fn create_project(
    db: State<'_, Db>,
    project_name: String,
    project_path: String,
) -> AppResult<project::Model> {
    project_service::create_project(&db, project_name, project_path).await
}

#[tauri::command]
pub async fn fetch_latest_opened_project(db: State<'_, Db>) -> AppResult<Option<project::Model>> {
    project_service::fetch_latest_opened_project(&db).await
}

#[tauri::command]
pub async fn query_recent_opened_project(
    db: State<'_, Db>,
    last_num: u64,
) -> AppResult<Vec<project::Model>> {
    project_service::query_recent_opened_project(&db, last_num).await
}
