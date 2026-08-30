use crate::entity::character;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, ConnectionTrait, DbErr, EntityTrait, IntoActiveModel,
    QueryFilter, QueryOrder, Set,
};
use serde_json::json;

pub struct NewCharacter {
    pub project_id: i64,
    pub name: String,
    pub character_code: String,
    pub tags: Vec<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

pub async fn insert<C>(db: &C, input: NewCharacter) -> Result<character::Model, DbErr>
where
    C: ConnectionTrait,
{
    character::ActiveModel {
        project_id: Set(input.project_id),
        name: Set(input.name),
        character_code: Set(input.character_code),
        tags: Set(json!(input.tags)),
        avatar_path: Set(None),
        created_at: Set(input.created_at),
        updated_at: Set(input.updated_at),
        ..Default::default()
    }
    .insert(db)
    .await
}

pub async fn update_avatar_path<C>(
    db: &C,
    character: character::Model,
    avatar_path: Option<String>,
    updated_at: i64,
) -> Result<character::Model, DbErr>
where
    C: ConnectionTrait,
{
    let mut active_model = character.into_active_model();
    active_model.avatar_path = Set(avatar_path);
    active_model.updated_at = Set(updated_at);
    active_model.update(db).await
}

pub async fn find_by_project_id<C>(db: &C, project_id: i64) -> Result<Vec<character::Model>, DbErr>
where
    C: ConnectionTrait,
{
    character::Entity::find()
        .filter(character::Column::ProjectId.eq(project_id))
        .order_by_asc(character::Column::Id)
        .all(db)
        .await
}
