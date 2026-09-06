use crate::domain::avatar_image::AvatarImage;
use crate::dto::character_dto::CharacterDTO;
use crate::dto::image_input::ImageInput;
use crate::entity::character;
use crate::error::AppResult;
use crate::service::character_service;
use crate::state::project_state::ProjectState;
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn create_character(
    project_state: State<'_, ProjectState>,
    character_name: &str,
    character_code: &str,
    avatar: Option<ImageInput>,
    tags: Vec<String>,
) -> AppResult<character::Model> {
    let project = project_state.project().await?;
    let avatar = avatar
        .map(|input| {
            let (bytes, mime_type) = input.into_parts();
            AvatarImage::try_new(bytes, mime_type)
        })
        .transpose()?;

    character_service::create_character(
        &project.db,
        character_name,
        character_code,
        tags,
        &project.info.project_path,
        avatar,
    )
    .await
}

#[tauri::command]
pub async fn list_character(
    app: AppHandle,
    project_state: State<'_, ProjectState>,
) -> AppResult<Vec<CharacterDTO>> {
    let project = project_state.project().await?;
    let characters =
        character_service::list_character(&project.db, &project.info.project_path).await?;
    let asset_scope = app.asset_protocol_scope();

    for character in &characters {
        if let Some(avatar_path) = &character.avatar_path {
            asset_scope
                .allow_file(avatar_path)
                .map_err(|error| std::io::Error::other(error.to_string()))?;
        }
    }

    Ok(characters)
}
