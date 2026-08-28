use sea_orm::DbErr;
use serde::ser::{Serialize, SerializeStruct, Serializer};
use serde_json::{json, Value};
use std::time::SystemTimeError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    // database error
    #[error("database error: {0}")]
    Database(#[from] DbErr),

    // system error
    #[error("system time error: {0}")]
    SystemTime(#[from] SystemTimeError),
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),

    // project error
    #[error("project path is already registered: {project_path}")]
    ProjectPathAlreadyRegistered { project_path: String },
    #[error("failed to create project directory: {project_path}")]
    ProjectDirectoryCreationFailed {
        project_path: String,
        #[source]
        source: std::io::Error,
    },
}

impl Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let (code, params): (&str, Option<Value>) = match self {
            Self::Database(_) => ("DATABASE_OPERATION_FAILED", None),
            Self::SystemTime(_) => ("SYSTEM_TIME_UNAVAILABLE", None),
            Self::Io(_) => ("FILE_SYSTEM_OPERATION_FAILED", None),
            Self::ProjectPathAlreadyRegistered { project_path } => (
                "PROJECT_PATH_ALREADY_REGISTERED",
                Some(json!({ "projectPath": project_path })),
            ),
            Self::ProjectDirectoryCreationFailed { project_path, .. } => (
                "PROJECT_DIRECTORY_CREATION_FAILED",
                Some(json!({ "projectPath": project_path })),
            ),
        };

        let mut state =
            serializer.serialize_struct("AppError", if params.is_some() { 2 } else { 1 })?;
        state.serialize_field("code", code)?;
        if let Some(params) = params {
            state.serialize_field("params", &params)?;
        }
        state.end()
    }
}

#[cfg(test)]
mod tests {
    use super::AppError;

    #[test]
    fn serializes_internal_errors_without_exposing_details() {
        let error = AppError::Io(std::io::Error::other("private filesystem detail"));
        let payload = serde_json::to_value(error).expect("error should serialize");

        assert_eq!(payload["code"], "FILE_SYSTEM_OPERATION_FAILED");
        assert!(payload.get("params").is_none());
        assert!(!payload.to_string().contains("private filesystem detail"));
    }
}
