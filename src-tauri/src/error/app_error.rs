use sea_orm::DbErr;
use std::fmt;
use std::time::SystemTimeError;

#[derive(Debug)]
pub enum AppError {
    Database(DbErr),
    SystemTime(SystemTimeError),
    Io(std::io::Error),
}

impl From<DbErr> for AppError {
    fn from(err: DbErr) -> Self {
        AppError::Database(err)
    }
}

impl From<SystemTimeError> for AppError {
    fn from(err: SystemTimeError) -> Self {
        AppError::SystemTime(err)
    }
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        AppError::Io(err)
    }
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Database(err) => write!(f, "database error: {err}"),
            AppError::SystemTime(err) => write!(f, "system time error: {err}"),
            AppError::Io(err) => write!(f, "I/O error: {err}"),
        }
    }
}

impl std::error::Error for AppError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Self::Database(error) => Some(error),
            Self::SystemTime(error) => Some(error),
            Self::Io(error) => Some(error),
        }
    }
}
