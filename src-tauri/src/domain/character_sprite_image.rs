use crate::error::{AppError, AppResult};

const MAX_CHARACTER_SPRITE_IMAGE_SIZE: usize = 20 * 1024 * 1024;
const PNG_SIGNATURE: &[u8; 8] = b"\x89PNG\r\n\x1a\n";
const PNG_IHDR_LENGTH: u32 = 13;
const PNG_DIMENSIONS_END: usize = 24;

#[derive(Debug)]
pub struct CharacterSpriteImage {
    bytes: Vec<u8>,
    width: i32,
    height: i32,
}

impl CharacterSpriteImage {
    pub fn try_new(bytes: Vec<u8>, mime_type: String) -> AppResult<Self> {
        if bytes.len() > MAX_CHARACTER_SPRITE_IMAGE_SIZE {
            return Err(AppError::CharacterSpriteImageTooLarge {
                max_size_mb: MAX_CHARACTER_SPRITE_IMAGE_SIZE / 1024 / 1024,
            });
        }

        if mime_type != "image/png" {
            return Err(AppError::InvalidCharacterSpriteImageData);
        }

        let (width, height) =
            read_png_dimensions(&bytes).ok_or(AppError::InvalidCharacterSpriteImageData)?;

        Ok(Self {
            bytes,
            width,
            height,
        })
    }

    pub fn extension(&self) -> &'static str {
        "png"
    }

    pub fn width(&self) -> i32 {
        self.width
    }

    pub fn height(&self) -> i32 {
        self.height
    }

    pub fn into_bytes(self) -> Vec<u8> {
        self.bytes
    }
}

fn read_png_dimensions(bytes: &[u8]) -> Option<(i32, i32)> {
    if bytes.len() < PNG_DIMENSIONS_END || !bytes.starts_with(PNG_SIGNATURE) {
        return None;
    }

    let ihdr_length = u32::from_be_bytes(bytes.get(8..12)?.try_into().ok()?);
    let ihdr_type = bytes.get(12..16)?;

    if ihdr_length != PNG_IHDR_LENGTH || ihdr_type != b"IHDR" {
        return None;
    }

    let width = u32::from_be_bytes(bytes.get(16..20)?.try_into().ok()?);
    let height = u32::from_be_bytes(bytes.get(20..24)?.try_into().ok()?);

    if width == 0 || height == 0 || width > i32::MAX as u32 || height > i32::MAX as u32 {
        return None;
    }

    Some((width as i32, height as i32))
}
