use crate::{
    db::Db,
    entity::project,
    error::{AppError, AppResult},
};
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct CurrentProject {
    pub db: Db,
    pub info: project::Model,
}

#[derive(Default)]
pub struct ProjectState {
    pub(crate) current: Mutex<Option<Arc<CurrentProject>>>,
}

impl ProjectState {
    // Capture the connection once so an operation keeps its original database.
    pub async fn project(&self, project_id: i64) -> AppResult<Arc<CurrentProject>> {
        self.current
            .lock()
            .await
            .as_ref()
            .filter(|current| current.info.id == project_id)
            .cloned()
            .ok_or(AppError::ProjectNotOpen)
    }
}
