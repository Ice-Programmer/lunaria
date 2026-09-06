use crate::domain::character_sprite_image::CharacterSpriteImage;
use crate::dto::image_input::ImageInput;
use crate::entity::character_sprite;
use crate::error::AppResult;
use crate::service::character_sprite_service;
use crate::state::project_state::ProjectState;
use serde::Deserialize;
use tauri::State;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateCharacterSpriteRequest {
    project_id: i64,
    sprite_set_id: i64,
    sprite_name: String,
    sprite_code: String,
    image: ImageInput,
}

#[tauri::command]
pub async fn create_character_sprite(
    project_state: State<'_, ProjectState>,
    request: CreateCharacterSpriteRequest,
) -> AppResult<character_sprite::Model> {
    let CreateCharacterSpriteRequest {
        project_id,
        sprite_set_id,
        sprite_name,
        sprite_code,
        image,
    } = request;
    let project = project_state.project(project_id).await?;
    let (bytes, mime_type) = image.into_parts();
    let image = CharacterSpriteImage::try_new(bytes, mime_type)?;

    character_sprite_service::create_character_sprite(
        &project.db,
        sprite_set_id,
        &sprite_name,
        &sprite_code,
        image,
        &project.info.project_path,
    )
    .await
}
