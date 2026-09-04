use crate::dto::image_input::ImageOutput;
use crate::entity::{character_sprite, character_sprite_set};
use std::path::Path;
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SpriteSetDTO {
    pub sprite_set_name: String,
    pub sprite_set_code: String,
    pub sprite_list: Vec<SpriteDTO>,
}

impl SpriteSetDTO {
    pub fn from_model(
        sprite_set: character_sprite_set::Model,
        sprite_list: Vec<SpriteDTO>,
    ) -> Self {
        Self {
            sprite_set_name: sprite_set.sprite_set_name,
            sprite_set_code: sprite_set.sprite_set_code,
            sprite_list,
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SpriteDTO {
    pub sprite_name: String,
    pub sprite_code: String,
    pub image_info: ImageOutput,
    pub is_default: i8,
    pub sort_order: i32,
}

impl SpriteDTO {
    pub fn from_model(sprite: character_sprite::Model, project_path: &str) -> Self {
        Self {
            sprite_name: sprite.sprite_name,
            sprite_code: sprite.sprite_code,
            is_default: sprite.is_default,
            sort_order: sprite.sort_order,
            image_info: ImageOutput {
                image_path: Path::new(project_path)
                    .join(sprite.image_path)
                    .to_string_lossy()
                    .to_string(),
                width: sprite.width,
                height: sprite.height,
            },
        }
    }
}
