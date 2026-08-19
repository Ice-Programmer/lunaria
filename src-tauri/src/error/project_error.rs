use sea_orm::DbErr;
use std::time::SystemTimeError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ProjectError {
    #[error("project path is already registered: {project_path}")]
    PathAlreadyRegistered { project_path: String },
    #[error("failed to create project directory: {project_path}")]
    DirectoryCreationFailed {
        project_path: String,
        #[source]
        source: std::io::Error,
    },
    #[error("project database operation failed: {0}")]
    Database(#[from] DbErr),
    #[error("system time is unavailable: {0}")]
    SystemTime(#[from] SystemTimeError),
}
