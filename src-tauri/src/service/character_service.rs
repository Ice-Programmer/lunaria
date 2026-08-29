use crate::entity::character;
use crate::error::{AppError, AppResult};
use crate::service::project_service;
use crate::util::time::current_timestamp;

use sea_orm::{
    ActiveModelTrait, DatabaseConnection, IntoActiveModel, Set, SqlErr, TransactionTrait,
};
use serde_json::json;
use std::fs;
use std::path::{Path, PathBuf};

pub async fn create_character(
    db: &DatabaseConnection,
    name: &str,
    character_code: &str,
    tags: Vec<String>,
    project_id: i64,
    img_path: Option<String>,
) -> AppResult<character::Model> {
    if tags.len() >= 5 {
        return Err(AppError::CharacterTagsMoreThanFive);
    }

    // 1. detect img_path is existing
    if let Some(path) = img_path.as_deref() {
        if !Path::new(path).is_file() {
            return Err(AppError::FileNotFound {
                path: path.to_string(),
            });
        }
    }

    // 2. find project
    let project = project_service::get_project_by_id(db, project_id).await?;

    let created_at = current_timestamp()?;

    // begin transaction
    let txn = db.begin().await?;

    // 3. create character
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

    // 4. create character folder
    let character_dir = PathBuf::from(&project.project_path)
        .join("characters")
        .join(character.id.to_string());

    fs::create_dir_all(&character_dir)?;

    // 5. have avatar save img to character folder
    let avatar_url = if let Some(source_path) = img_path {
        let source = Path::new(&source_path);
        let extension = source
            .extension()
            .and_then(|ext| ext.to_str())
            .unwrap_or("png");

        let avatar_file_name = format!("avatar.{extension}");

        let target_path = character_dir.join(&avatar_file_name);

        fs::copy(source, &target_path)?;

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

    // 6. update character avatar path
    let mut active_model = character.into_active_model();

    active_model.avatar_path = Set(avatar_url);
    active_model.updated_at = Set(current_timestamp()?);

    let character = active_model.update(&txn).await?;

    // 7. submit transaction
    txn.commit().await?;

    Ok(character)
}
