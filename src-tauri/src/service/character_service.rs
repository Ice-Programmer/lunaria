use crate::entity::character;
use crate::error::{AppError, AppResult};
use crate::service::project_service;
use crate::util::time::current_timestamp;

use sea_orm::{
    ActiveModelTrait, DatabaseConnection, IntoActiveModel, Set, SqlErr, TransactionTrait,
};
use serde::Deserialize;
use serde_json::json;
use std::fs;
use std::path::PathBuf;

const MAX_AVATAR_SIZE: usize = 5 * 1024 * 1024;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AvatarInput {
    pub bytes: Vec<u8>,
    pub mime_type: String,
}

impl AvatarInput {
    fn extension(&self) -> AppResult<&'static str> {
        let is_valid = match self.mime_type.as_str() {
            "image/png" => self.bytes.starts_with(b"\x89PNG\r\n\x1a\n"),
            "image/jpeg" => self.bytes.starts_with(&[0xff, 0xd8, 0xff]),
            _ => false,
        };

        if !is_valid {
            return Err(AppError::InvalidAvatarData);
        }

        match self.mime_type.as_str() {
            "image/png" => Ok("png"),
            "image/jpeg" => Ok("jpg"),
            _ => Err(AppError::InvalidAvatarData),
        }
    }
}

pub async fn create_character(
    db: &DatabaseConnection,
    name: &str,
    character_code: &str,
    tags: Vec<String>,
    project_id: i64,
    avatar: Option<AvatarInput>,
) -> AppResult<character::Model> {
    if tags.len() > 5 {
        return Err(AppError::TooManyTags { tag_num: 5 });
    }

    let avatar_extension = if let Some(avatar) = avatar.as_ref() {
        if avatar.bytes.len() > MAX_AVATAR_SIZE {
            return Err(AppError::AvatarTooLarge {
                max_size_mb: MAX_AVATAR_SIZE / 1024 / 1024,
            });
        }

        Some(avatar.extension()?)
    } else {
        None
    };

    // 1. find project
    let project = project_service::get_project_by_id(db, project_id).await?;

    let created_at = current_timestamp()?;

    // begin transaction
    let txn = db.begin().await?;

    // 2. create character
    let character = character::ActiveModel {
        project_id: Set(project_id),
        name: Set(name.to_string()),
        character_code: Set(character_code.to_string()),
        tags: Set(json!(tags)),
        avatar_path: Set(None),
        created_at: Set(created_at),
        updated_at: Set(created_at),
        ..Default::default()
    }
    .insert(&txn)
    .await
    .map_err(|err| {
        if matches!(err.sql_err(), Some(SqlErr::UniqueConstraintViolation(_))) {
            AppError::CharacterCodeAlreadyRegistered {
                character_code: character_code.to_string(),
            }
        } else {
            AppError::from(err)
        }
    })?;

    // 3. create character folder
    let character_dir = PathBuf::from(&project.project_path)
        .join("characters")
        .join(character.id.to_string());

    fs::create_dir_all(&character_dir)?;

    // 4. save the cropped avatar bytes to the character folder
    let avatar_url = if let (Some(avatar), Some(extension)) = (avatar, avatar_extension) {
        let avatar_file_name = format!("avatar.{extension}");

        let target_path = character_dir.join(&avatar_file_name);

        fs::write(&target_path, avatar.bytes)?;

        // Store the path relative to the project root directory
        Some(
            PathBuf::from("characters")
                .join(character.id.to_string())
                .join(avatar_file_name)
                .to_string_lossy()
                .to_string(),
        )
    } else {
        None
    };

    // 5. update character avatar path
    let mut active_model = character.into_active_model();

    active_model.avatar_path = Set(avatar_url);
    active_model.updated_at = Set(current_timestamp()?);

    let character = active_model.update(&txn).await?;

    // 6. submit transaction
    txn.commit().await?;

    Ok(character)
}
