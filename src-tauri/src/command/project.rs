use crate::{
    db::Db,
    entity::project,
    error::{CommandError, CommandResult},
    service::project_service,
};
use tauri::State;

#[tauri::command]
pub async fn create_project(
    db: State<'_, Db>,
    project_name: String,
    project_path: String,
) -> CommandResult<project::Model> {
    project_service::create_project(&db, project_name, project_path)
        .await
        .map_err(CommandError::from)
}
