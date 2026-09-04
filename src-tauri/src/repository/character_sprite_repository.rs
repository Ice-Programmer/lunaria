use crate::entity::character_sprite;
use sea_orm::{
    ColumnTrait, ConnectionTrait, DbErr, EntityTrait, PaginatorTrait, QueryFilter, QueryOrder,
};

pub async fn find_last_by_sprite_set_id<C>(
    db: &C,
    sprite_set_id: i64,
) -> Result<Option<character_sprite::Model>, DbErr>
where
    C: ConnectionTrait,
{
    character_sprite::Entity::find()
        .filter(character_sprite::Column::SpriteSetId.eq(sprite_set_id))
        .order_by_desc(character_sprite::Column::SortOrder)
        .order_by_desc(character_sprite::Column::Id)
        .one(db)
        .await
}

pub async fn count_by_character_id<C>(db: &C, character_id: i64) -> Result<u64, DbErr>
where
    C: ConnectionTrait,
{
    character_sprite::Entity::find()
        .filter(character_sprite::Column::CharacterId.eq(character_id))
        .count(db)
        .await
}

pub async fn list_by_character_id<C>(
    db: &C,
    character_id: i64,
) -> Result<Vec<character_sprite::Model>, DbErr>
where
    C: ConnectionTrait,
{
    character_sprite::Entity::find()
        .filter(character_sprite::Column::CharacterId.eq(character_id))
        .all(db)
        .await
}
