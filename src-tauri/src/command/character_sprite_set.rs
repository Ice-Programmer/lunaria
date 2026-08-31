use crate::db::Db;
use crate::entity::character_sprite_set;
use crate::error::AppResult;
use crate::service::character_sprite_set_service;
use tauri::State;

#[tauri::command]
pub async fn create_character_sprite_set(
    db: State<'_, Db>,
    character_id: i64,
    sprite_set_name: &str,
    sprite_set_code: &str,
) -> AppResult<character_sprite_set::Model> {
    character_sprite_set_service::create_character_sprite_set(
        &db,
        character_id,
        sprite_set_name,
        sprite_set_code,
    )
    .await
}
