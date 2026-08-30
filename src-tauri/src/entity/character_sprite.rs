use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "character_sprite")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i64,

    pub project_id: i64,

    pub character_id: i64,

    #[sea_orm(unique_key = "character_sprite_unique")]
    pub sprite_set_id: i64,

    #[sea_orm(unique_key = "character_sprite_unique")]
    pub sprite_code: String,

    pub sprite_name: String,

    pub image_path: String,

    pub width: i32,

    pub height: i32,

    pub is_default: i8,

    pub sort_order: i32,

    pub created_at: i64,

    pub updated_at: i64,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::project::Entity",
        from = "Column::ProjectId",
        to = "super::project::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Project,

    #[sea_orm(
        belongs_to = "super::character::Entity",
        from = "Column::CharacterId",
        to = "super::character::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Character,

    #[sea_orm(
        belongs_to = "super::character_sprite_set::Entity",
        from = "Column::SpriteSetId",
        to = "super::character_sprite_set::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    CharacterSpriteSet,
}

impl Related<super::project::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Project.def()
    }
}

impl Related<super::character::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Character.def()
    }
}

impl Related<super::character_sprite_set::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CharacterSpriteSet.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
