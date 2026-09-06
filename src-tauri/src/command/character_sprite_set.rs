use crate::dto::sprite_dto::SpriteSetDTO;
use crate::entity::character_sprite_set;
use crate::error::AppResult;
use crate::service::character_sprite_set_service;
use crate::state::project_state::ProjectState;
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn create_character_sprite_set(
    project_state: State<'_, ProjectState>,
    project_id: i64,
    character_id: i64,
    sprite_set_name: &str,
    sprite_set_code: &str,
) -> AppResult<character_sprite_set::Model> {
    let project = project_state.project(project_id).await?;
    character_sprite_set_service::create_character_sprite_set(
        &project.db,
        character_id,
        sprite_set_name,
        sprite_set_code,
    )
    .await
}

#[tauri::command]
pub async fn list_sprite_set(
    app: AppHandle,
    project_state: State<'_, ProjectState>,
    project_id: i64,
    character_id: i64,
) -> AppResult<Vec<SpriteSetDTO>> {
    let project = project_state.project(project_id).await?;
    let sets = character_sprite_set_service::list_character_set(
        &project.db,
        character_id,
        &project.info.project_path,
    )
    .await?;
    let scope = app.asset_protocol_scope();
    for set in &sets {
        for sprite in &set.sprite_list {
            scope
                .allow_file(&sprite.image_info.image_path)
                .map_err(|error| std::io::Error::other(error.to_string()))?;
        }
    }
    Ok(sets)
}
