use crate::domain::avatar_image::AvatarImage;
use crate::dto::character_dto::CharacterDTO;
use crate::entity::character;
use crate::error::{AppError, AppResult};
use crate::repository::character_repository::{self, NewCharacter};
use crate::repository::{character_sprite_repository, character_sprite_set_repository};
use crate::util::time::current_timestamp;

use sea_orm::{DatabaseConnection, SqlErr, TransactionTrait};
use std::fs;
use std::path::PathBuf;

pub async fn create_character(
    db: &DatabaseConnection,
    name: &str,
    character_code: &str,
    tags: Vec<String>,
    project_path: &str,
    avatar: Option<AvatarImage>,
) -> AppResult<character::Model> {
    if tags.len() > 5 {
        return Err(AppError::TooManyTags { tag_num: 5 });
    }

    let created_at = current_timestamp()?;

    // begin transaction
    let txn = db.begin().await?;

    // Create the character in the current project's database.
    let character = character_repository::insert(
        &txn,
        NewCharacter {
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

    // Create the character folder.
    let character_dir = PathBuf::from(project_path)
        .join("characters")
        .join(character.id.to_string());

    fs::create_dir_all(&character_dir)?;

    // Save the cropped avatar bytes to the character folder.
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

    // Update the character avatar path.
    let character =
        character_repository::update_avatar_path(&txn, character, avatar_url, current_timestamp()?)
            .await?;

    // Commit the transaction.
    txn.commit().await?;

    Ok(character)
}

pub async fn list_character(
    db: &DatabaseConnection,
    project_path: &str,
) -> AppResult<Vec<CharacterDTO>> {
    let characters = character_repository::find_all(db).await?;

    let mut result_list = Vec::with_capacity(characters.len());

    for character in characters {
        let (sprite_set_num, sprite_num) = tokio::try_join!(
            character_sprite_set_repository::count_by_character_id(db, character.id),
            character_sprite_repository::count_by_character_id(db, character.id),
        )?;

        result_list.push(CharacterDTO::from_model(
            character,
            project_path,
            sprite_set_num as u32,
            sprite_num as u32,
        ));
    }

    Ok(result_list)
}
