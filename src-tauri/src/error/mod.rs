pub mod app_error;
pub mod character_error;
pub mod command_error;
pub mod project_error;

pub use app_error::AppError;
pub use character_error::CharacterError;
pub use command_error::CommandError;
pub use project_error::ProjectError;

pub type AppResult<T> = Result<T, AppError>;
pub type CommandResult<T> = Result<T, CommandError>;
pub type ProjectResult<T> = Result<T, ProjectError>;
