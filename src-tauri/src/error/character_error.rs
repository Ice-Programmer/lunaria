use sea_orm::DbErr;
use std::time::SystemTimeError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum CharacterError {
    #[error("character database operation failed: {0}")]
    Database(#[from] DbErr),
    #[error("system time is unavailable: {0}")]
    SystemTime(#[from] SystemTimeError),
}
