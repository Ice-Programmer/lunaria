pub mod app_error;

pub use app_error::AppError;

pub type AppResult<T> = Result<T, AppError>;
