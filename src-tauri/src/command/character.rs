use crate::db::Db;
use crate::entity::character;
use crate::error::AppResult;
use crate::service::character_service;
use tauri::State;

#[tauri::command]
pub async fn create_character(
    db: State<'_, Db>,
    project_id: i64,
    character_name: &str,
    description: Option<String>,
) -> AppResult<character::Model> {
    character_service::create_character(&db, character_name, description, project_id).await
}
