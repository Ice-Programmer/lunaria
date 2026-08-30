use crate::db::Db;
use crate::domain::avatar_image::AvatarImage;
use crate::dto::character_dto::CharacterDTO;
use crate::dto::image_input::ImageInput;
use crate::entity::character;
use crate::error::AppResult;
use crate::service::character_service;
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn create_character(
    db: State<'_, Db>,
    project_id: i64,
    character_name: &str,
    character_code: &str,
    avatar: Option<ImageInput>,
    tags: Vec<String>,
) -> AppResult<character::Model> {
    let avatar = avatar
        .map(|input| {
            let (bytes, mime_type) = input.into_parts();
            AvatarImage::try_new(bytes, mime_type)
        })
        .transpose()?;

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

#[tauri::command]
pub async fn list_character(
    app: AppHandle,
    db: State<'_, Db>,
    project_id: i64,
) -> AppResult<Vec<CharacterDTO>> {
    let characters = character_service::list_character(&db, project_id).await?;
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
