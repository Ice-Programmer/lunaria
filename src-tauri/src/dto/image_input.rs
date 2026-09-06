use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ImageInput {
    bytes: Vec<u8>,
    mime_type: String,
}

impl ImageInput {
    pub fn into_parts(self) -> (Vec<u8>, String) {
        (self.bytes, self.mime_type)
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImageOutput {
    pub image_path: String,
    pub width: i32,
    pub height: i32,
}
