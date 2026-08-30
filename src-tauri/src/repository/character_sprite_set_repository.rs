use crate::entity::character_sprite_set;
use sea_orm::{ConnectionTrait, DbErr, EntityTrait};

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
