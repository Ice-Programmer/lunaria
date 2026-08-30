use crate::entity::character;
use serde::Serialize;
use std::path::Path;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CharacterDTO {
    pub id: i64,
    pub character_name: String,
    pub character_code: String,
    pub avatar_path: Option<String>,
}

impl CharacterDTO {
    pub fn from_model(character: character::Model, project_path: &str) -> Self {
        let avatar_path = character.avatar_path.map(|path| {
            Path::new(project_path)
                .join(path)
                .to_string_lossy()
                .to_string()
        });

        Self {
            id: character.id,
            character_name: character.name,
            character_code: character.character_code,
            avatar_path,
        }
    }
}
