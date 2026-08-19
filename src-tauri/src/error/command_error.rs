use crate::error::{AppError, CharacterError, ProjectError};
use serde::Serialize;
use serde_json::json;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CommandError {
    code: CommandErrorCode,
    #[serde(skip_serializing_if = "Option::is_none")]
    params: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
enum CommandErrorCode {
    ProjectPathAlreadyRegistered,
    ProjectDirectoryCreationFailed,
    DatabaseOperationFailed,
    FileSystemOperationFailed,
    SystemTimeUnavailable,
}

impl CommandError {
    fn new(code: CommandErrorCode) -> Self {
        Self { code, params: None }
    }

    fn with_params(mut self, params: serde_json::Value) -> Self {
        self.params = Some(params);
        self
    }
}

impl From<AppError> for CommandError {
    fn from(error: AppError) -> Self {
        match error {
            AppError::Database(_) => Self::new(CommandErrorCode::DatabaseOperationFailed),
            AppError::SystemTime(_) => Self::new(CommandErrorCode::SystemTimeUnavailable),
            AppError::Io(_) => Self::new(CommandErrorCode::FileSystemOperationFailed),
        }
    }
}

impl From<ProjectError> for CommandError {
    fn from(error: ProjectError) -> Self {
        match error {
            ProjectError::PathAlreadyRegistered { project_path } => {
                Self::new(CommandErrorCode::ProjectPathAlreadyRegistered)
                    .with_params(json!({ "projectPath": project_path }))
            }
            ProjectError::DirectoryCreationFailed { project_path, .. } => {
                Self::new(CommandErrorCode::ProjectDirectoryCreationFailed)
                    .with_params(json!({ "projectPath": project_path }))
            }
            ProjectError::Database(_) => Self::new(CommandErrorCode::DatabaseOperationFailed),
            ProjectError::SystemTime(_) => Self::new(CommandErrorCode::SystemTimeUnavailable),
        }
    }
}

impl From<CharacterError> for CommandError {
    fn from(error: CharacterError) -> Self {
        match error {
            CharacterError::Database(_) => Self::new(CommandErrorCode::DatabaseOperationFailed),
            CharacterError::SystemTime(_) => Self::new(CommandErrorCode::SystemTimeUnavailable),
        }
    }
}
