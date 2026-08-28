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
