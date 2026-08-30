use crate::error::{AppError, AppResult};

const MAX_AVATAR_SIZE: usize = 5 * 1024 * 1024;

#[derive(Debug)]
enum ImageFormat {
    Png,
    Jpeg,
}

impl ImageFormat {
    fn extension(&self) -> &'static str {
        match self {
            Self::Png => "png",
            Self::Jpeg => "jpg",
        }
    }
}

#[derive(Debug)]
pub struct AvatarImage {
    bytes: Vec<u8>,
    format: ImageFormat,
}

impl AvatarImage {
    pub fn try_new(bytes: Vec<u8>, mime_type: String) -> AppResult<Self> {
        if bytes.len() > MAX_AVATAR_SIZE {
            return Err(AppError::AvatarTooLarge {
                max_size_mb: MAX_AVATAR_SIZE / 1024 / 1024,
            });
        }

        let format = match mime_type.as_str() {
            "image/png" if bytes.starts_with(b"\x89PNG\r\n\x1a\n") => ImageFormat::Png,
            "image/jpeg" if bytes.starts_with(&[0xff, 0xd8, 0xff]) => ImageFormat::Jpeg,
            _ => return Err(AppError::InvalidAvatarData),
        };

        Ok(Self { bytes, format })
    }

    pub fn extension(&self) -> &'static str {
        self.format.extension()
    }

    pub fn into_bytes(self) -> Vec<u8> {
        self.bytes
    }
}

#[cfg(test)]
mod tests {
    use super::AvatarImage;
    use crate::error::AppError;

    #[test]
    fn accepts_supported_image_signatures() {
        let png = AvatarImage::try_new(
            b"\x89PNG\r\n\x1a\ncontent".to_vec(),
            "image/png".to_string(),
        )
        .expect("PNG should be valid");
        let jpeg = AvatarImage::try_new(vec![0xff, 0xd8, 0xff, 0xe0], "image/jpeg".to_string())
            .expect("JPEG should be valid");

        assert_eq!(png.extension(), "png");
        assert_eq!(jpeg.extension(), "jpg");
    }

    #[test]
    fn rejects_mime_and_content_mismatch() {
        let result = AvatarImage::try_new(b"not a png".to_vec(), "image/png".to_string());

        assert!(matches!(result, Err(AppError::InvalidAvatarData)));
    }
}
