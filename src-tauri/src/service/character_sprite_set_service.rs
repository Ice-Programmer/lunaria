use crate::dto::sprite_dto::{SpriteDTO, SpriteSetDTO};
use crate::entity::{character_sprite, character_sprite_set};
use crate::error::{AppError, AppResult};
use crate::repository::{
    character_repository, character_sprite_repository, character_sprite_set_repository,
    project_repository,
};
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};
use std::collections::HashMap;

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

pub async fn list_character_set(
    db: &DatabaseConnection,
    character_id: i64,
) -> AppResult<Vec<SpriteSetDTO>> {
    let character = character_repository::find_by_id(db, character_id)
        .await?
        .ok_or(AppError::CharacterNotFound { character_id })?;

    let project = project_repository::find_by_id(db, character.project_id)
        .await?
        .ok_or(AppError::ProjectNotFound {
            project_id: character.project_id,
        })?;

    let mut sprite_map: HashMap<i64, Vec<SpriteDTO>> =
        character_sprite_repository::list_by_character_id(db, character_id)
            .await?
            .into_iter()
            .fold(HashMap::new(), |mut map, sprite| {
                map.entry(sprite.sprite_set_id)
                    .or_default()
                    .push(SpriteDTO::from_model(sprite, project.project_path.as_str()));
                map
            });

    let sprite_dto_list = character_sprite_set_repository::find_by_character_id(db, character_id)
        .await?
        .into_iter()
        .map(|sprite_set| {
            let sprite_list = sprite_map.remove(&sprite_set.id).unwrap_or_default();

            SpriteSetDTO::from_model(sprite_set, sprite_list)
        })
        .collect();

    Ok(sprite_dto_list)
}
