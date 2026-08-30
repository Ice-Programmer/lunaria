use crate::domain::avatar_image::AvatarImage;
use crate::entity::character;
use crate::error::{AppError, AppResult};
use crate::repository::character_repository::{self, NewCharacter};
use crate::repository::project_repository;
use crate::util::time::current_timestamp;

use sea_orm::{DatabaseConnection, SqlErr, TransactionTrait};
use std::fs;
use std::path::PathBuf;

pub async fn create_character(
    db: &DatabaseConnection,
    name: &str,
    character_code: &str,
    tags: Vec<String>,
    project_id: i64,
    avatar: Option<AvatarImage>,
) -> AppResult<character::Model> {
    if tags.len() > 5 {
        return Err(AppError::TooManyTags { tag_num: 5 });
    }

    // 1. find project
    let project = project_repository::find_by_id(db, project_id)
        .await?
        .ok_or(AppError::ProjectNotFound { project_id })?;

    let created_at = current_timestamp()?;

    // begin transaction
    let txn = db.begin().await?;

    // 2. create character
    let character = character_repository::insert(
        &txn,
        NewCharacter {
            project_id,
            name: name.to_string(),
            character_code: character_code.to_string(),
            tags,
            created_at,
            updated_at: created_at,
        },
    )
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
    let avatar_url = if let Some(avatar) = avatar {
        let extension = avatar.extension();
        let avatar_file_name = format!("avatar.{extension}");

        let target_path = character_dir.join(&avatar_file_name);

        fs::write(&target_path, avatar.into_bytes())?;

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
    let character =
        character_repository::update_avatar_path(&txn, character, avatar_url, current_timestamp()?)
            .await?;

    // 6. submit transaction
    txn.commit().await?;

    Ok(character)
}

pub async fn list_character(
    db: &DatabaseConnection,
    project_id: i64,
) -> AppResult<Vec<character::Model>> {
    project_repository::find_by_id(db, project_id)
        .await?
        .ok_or(AppError::ProjectNotFound { project_id })?;

    Ok(character_repository::find_by_project_id(db, project_id).await?)
}
