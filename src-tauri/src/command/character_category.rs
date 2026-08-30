use crate::db::Db;
use crate::entity::character_category;
use crate::error::AppResult;
use crate::service::character_category_service;
use tauri::State;

#[tauri::command]
pub async fn create_character_category(
    db: State<'_, Db>,
    project_id: i64,
    character_id: i64,
    category_name: &str,
    category_code: &str,
) -> AppResult<character_category::Model> {
    character_category_service::create_character_category(
        &db,
        project_id,
        character_id,
        category_name,
        category_code,
    )
    .await
}
