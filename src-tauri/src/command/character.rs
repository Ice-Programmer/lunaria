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
    character_code: &str,
    avatar: Option<character_service::AvatarInput>,
    tags: Vec<String>,
) -> AppResult<character::Model> {
    character_service::create_character(
        &db,
        character_name,
        character_code,
        tags,
        project_id,
        avatar,
    )
    .await
}
