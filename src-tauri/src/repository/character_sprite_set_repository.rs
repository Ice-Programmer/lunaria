use crate::entity::character_sprite_set;
use sea_orm::{ColumnTrait, ConnectionTrait, DbErr, EntityTrait, PaginatorTrait, QueryFilter};

pub async fn find_by_id<C>(
    db: &C,
    sprite_set_id: i64,
) -> Result<Option<character_sprite_set::Model>, DbErr>
where
    C: ConnectionTrait,
{
    character_sprite_set::Entity::find_by_id(sprite_set_id)
        .one(db)
        .await
}

pub async fn count_by_character_id<C>(db: &C, character_id: i64) -> Result<u64, DbErr>
where
    C: ConnectionTrait,
{
    character_sprite_set::Entity::find()
        .filter(character_sprite_set::Column::CharacterId.eq(character_id))
        .count(db)
        .await
}

pub async fn find_by_character_id<C>(
    db: &C,
    character_id: i64,
) -> Result<Vec<character_sprite_set::Model>, DbErr>
where
    C: ConnectionTrait,
{
    character_sprite_set::Entity::find()
        .filter(character_sprite_set::Column::CharacterId.eq(character_id))
        .all(db)
        .await
}
