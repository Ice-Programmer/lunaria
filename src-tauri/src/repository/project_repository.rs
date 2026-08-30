use crate::entity::project;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, ConnectionTrait, DbErr, EntityTrait, QueryFilter, QueryOrder,
    QuerySelect, Set,
};

pub struct NewProject {
    pub project_name: String,
    pub project_path: String,
    pub created_at: i64,
    pub last_opened_at: i64,
}

pub async fn insert<C>(db: &C, input: NewProject) -> Result<project::Model, DbErr>
where
    C: ConnectionTrait,
{
    project::ActiveModel {
        project_name: Set(input.project_name),
        project_path: Set(input.project_path),
        created_at: Set(input.created_at),
        last_opened_at: Set(input.last_opened_at),
        ..Default::default()
    }
    .insert(db)
    .await
}

pub async fn find_by_id<C>(db: &C, project_id: i64) -> Result<Option<project::Model>, DbErr>
where
    C: ConnectionTrait,
{
    project::Entity::find_by_id(project_id).one(db).await
}

pub async fn find_by_path<C>(db: &C, project_path: &str) -> Result<Option<project::Model>, DbErr>
where
    C: ConnectionTrait,
{
    project::Entity::find()
        .filter(project::Column::ProjectPath.eq(project_path))
        .one(db)
        .await
}

pub async fn find_latest_opened<C>(db: &C) -> Result<Option<project::Model>, DbErr>
where
    C: ConnectionTrait,
{
    project::Entity::find()
        .order_by_desc(project::Column::LastOpenedAt)
        .order_by_desc(project::Column::Id)
        .one(db)
        .await
}

pub async fn find_recent_opened<C>(db: &C, limit: u64) -> Result<Vec<project::Model>, DbErr>
where
    C: ConnectionTrait,
{
    project::Entity::find()
        .order_by_desc(project::Column::LastOpenedAt)
        .order_by_desc(project::Column::Id)
        .limit(limit)
        .all(db)
        .await
}
