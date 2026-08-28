use crate::entity::character;
use crate::error::AppResult;
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};

pub async fn create_character(
    db: &DatabaseConnection,
    name: &str,
    description: Option<String>,
    project_id: i64,
) -> AppResult<character::Model> {
    let created_at = current_timestamp()?;

    let character = character::ActiveModel {
        project_id: Set(project_id),
        name: Set(name.to_string()),
        description: Set(description),
        created_at: Set(created_at),
        updated_at: Set(created_at),
        ..Default::default()
    };

    // create character folder
    // 1. find project path

    Ok(character.insert(db).await?)
}
