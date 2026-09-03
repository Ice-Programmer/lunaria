use crate::entity::character_sprite_set;
use crate::error::{AppError, AppResult};
use crate::repository::{character_repository};
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};

pub async fn create_character_sprite_set(
    db: &DatabaseConnection,
    character_id: i64,
    sprite_set_name: &str,
    sprite_set_code: &str,
) -> AppResult<character_sprite_set::Model> {
    let character = character_repository::find_by_id(db, character_id)
        .await?
        .ok_or(AppError::CharacterNotFound { character_id })?;

    let created_at = current_timestamp()?;

    let character_sprite_set = character_sprite_set::ActiveModel {
        project_id: Set(character.project_id),
        character_id: Set(character_id),
        sprite_set_name: Set(sprite_set_name.to_string()),
        sprite_set_code: Set(sprite_set_code.to_string()),
        created_at: Set(created_at),
        updated_at: Set(created_at),
        ..Default::default()
    }
    .insert(db)
    .await?;

    Ok(character_sprite_set)
}
