use crate::db::Db;
use crate::domain::avatar_image::AvatarImage;
use crate::entity::character;
use crate::error::AppResult;
use crate::service::character_service;
use serde::Deserialize;
use tauri::State;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AvatarInput {
    bytes: Vec<u8>,
    mime_type: String,
}

#[tauri::command]
pub async fn create_character(
    db: State<'_, Db>,
    project_id: i64,
    character_name: &str,
    character_code: &str,
    avatar: Option<AvatarInput>,
    tags: Vec<String>,
) -> AppResult<character::Model> {
    let avatar = avatar
        .map(|input| AvatarImage::try_new(input.bytes, input.mime_type))
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
