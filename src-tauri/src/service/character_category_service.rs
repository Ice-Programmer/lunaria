use crate::entity::character_category;
use crate::error::{AppError, AppResult};
use crate::repository::{character_repository, project_repository};
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, EntityTrait, Set};

pub async fn create_character_category(
    db: &DatabaseConnection,
    project_id: i64,
    character_id: i64,
    category_name: &str,
    category_code: &str,
) -> AppResult<character_category::Model> {
    project_repository::find_by_id(db, project_id)
        .await?
        .ok_or(AppError::ProjectNotFound { project_id })?;

    character_repository::find_by_id(db, character_id)
        .await?
        .ok_or(AppError::CharacterNotFound { character_id })?;

    let created_at = current_timestamp()?;

    let character_category = character_category::ActiveModel {
        project_id: Set(project_id),
        character_id: Set(character_id),
        category_name: Set(category_name.to_string()),
        category_code: Set(category_code.to_string()),
        created_at: Set(created_at),
        updated_at: Set(created_at),
        ..Default::default()
    }
    .insert(db)
    .await?;

    Ok(character_category)
}
