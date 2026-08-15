use crate::{db::Db, entity::project, service::project_service};
use tauri::State;

#[tauri::command]
pub async fn create_project(
    db: State<'_, Db>,
    project_name: String,
    project_path: String,
) -> Result<project::Model, String> {
    project_service::create_project(&db, project_name, project_path)
        .await
        .map_err(|error| error.to_string())
}
