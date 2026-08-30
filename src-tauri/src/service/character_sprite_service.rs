use crate::domain::character_sprite_image::CharacterSpriteImage;
use crate::entity::character_sprite;
use crate::error::{AppError, AppResult};
use crate::repository::character_sprite_repository::{self};
use crate::repository::{character_sprite_set_repository, project_repository};
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set, SqlErr, TransactionTrait};
use std::fs;
use std::path::PathBuf;

pub async fn create_character_sprite(
    db: &DatabaseConnection,
    sprite_set_id: i64,
    sprite_name: &str,
    sprite_code: &str,
    image: CharacterSpriteImage,
) -> AppResult<character_sprite::Model> {
    if !is_valid_sprite_code(sprite_code) {
        return Err(AppError::InvalidCharacterSpriteCode {
            sprite_code: sprite_code.to_string(),
        });
    }

    let sprite_set = character_sprite_set_repository::find_by_id(db, sprite_set_id)
        .await?
        .ok_or(AppError::CharacterSpriteSetNotFound { sprite_set_id })?;

    let project = project_repository::find_by_id(db, sprite_set.project_id)
        .await?
        .ok_or(AppError::ProjectNotFound {
            project_id: sprite_set.project_id,
        })?;

    let last_sprite =
        character_sprite_repository::find_last_by_sprite_set_id(db, sprite_set_id).await?;
    let (is_default, sort_order) = match last_sprite {
        Some(sprite) => (0, sprite.sort_order.saturating_add(1)),
        None => (1, 0),
    };

    let relative_image_path = PathBuf::from("characters")
        .join(sprite_set.character_id.to_string())
        .join("sprites")
        .join(sprite_set.id.to_string())
        .join(format!("{sprite_code}.{}", image.extension()));
    let target_path = PathBuf::from(&project.project_path).join(&relative_image_path);

    let created_at = current_timestamp()?;
    let width = image.width();
    let height = image.height();
    let image_bytes = image.into_bytes();
    let transaction = db.begin().await?;

    let sprite = character_sprite::ActiveModel {
        project_id: Set(sprite_set.project_id),
        character_id: Set(sprite_set.character_id),
        sprite_set_id: Set(sprite_set_id),
        sprite_code: Set(sprite_code.to_string()),
        sprite_name: Set(sprite_name.to_string()),
        image_path: Set(relative_image_path.to_string_lossy().to_string()),
        width: Set(width),
        height: Set(height),
        is_default: Set(is_default),
        sort_order: Set(sort_order),
        created_at: Set(created_at),
        updated_at: Set(created_at),
        ..Default::default()
    }
    .insert(db)
    .await
    .map_err(|error| {
        if matches!(error.sql_err(), Some(SqlErr::UniqueConstraintViolation(_))) {
            AppError::CharacterSpriteCodeAlreadyRegistered {
                sprite_code: sprite_code.to_string(),
            }
        } else {
            AppError::from(error)
        }
    })?;

    if let Some(parent) = target_path.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(&target_path, image_bytes)?;

    if let Err(error) = transaction.commit().await {
        let _ = fs::remove_file(&target_path);
        return Err(error.into());
    }

    Ok(sprite)
}

fn is_valid_sprite_code(code: &str) -> bool {
    let mut characters = code.chars();

    matches!(characters.next(), Some(character) if character.is_ascii_lowercase())
        && characters.all(|character| {
            character.is_ascii_lowercase() || character.is_ascii_digit() || character == '_'
        })
}
