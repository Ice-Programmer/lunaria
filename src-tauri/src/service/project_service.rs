use crate::entity::project;
use crate::error::{AppError, AppResult};
use crate::util::file::ensure_dir;
use crate::util::time::current_timestamp;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter, QueryOrder, Set,
};

pub async fn create_project(
    db: &DatabaseConnection,
    project_name: String,
    project_path: String,
) -> AppResult<project::Model> {
    let created_at = current_timestamp()?;

    let registered_project = project::Entity::find()
        .filter(project::Column::ProjectPath.eq(&project_path))
        .one(db)
        .await?;

    if registered_project.is_some() {
        return Err(AppError::ProjectPathAlreadyRegistered { project_path });
    }

    ensure_dir(&project_path)
        .await
        .map_err(|source| AppError::ProjectDirectoryCreationFailed {
            project_path: project_path.clone(),
            source,
        })?;

    let project = project::ActiveModel {
        project_name: Set(project_name),
        project_path: Set(project_path),
        created_at: Set(created_at),
        last_opened_at: Set(created_at),
        ..Default::default()
    };

    Ok(project.insert(db).await?)
}

pub async fn fetch_latest_opened_project(
    db: &DatabaseConnection,
) -> AppResult<Option<project::Model>> {
    let project = project::Entity::find()
        .order_by_desc(project::Column::LastOpenedAt)
        .one(db)
        .await?;

    Ok(project)
}

#[cfg(test)]
mod tests {
    use super::create_project;
    use crate::{db, entity::project};
    use sea_orm::EntityTrait;
    use std::path::PathBuf;
    use std::sync::atomic::{AtomicU64, Ordering};
    use std::time::{SystemTime, UNIX_EPOCH};

    static TEST_DIRECTORY_SEQUENCE: AtomicU64 = AtomicU64::new(0);

    struct TestDirectory(PathBuf);

    impl TestDirectory {
        fn new() -> Self {
            let unique_id = SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .expect("system clock should be after the Unix epoch")
                .as_nanos();
            let sequence = TEST_DIRECTORY_SEQUENCE.fetch_add(1, Ordering::Relaxed);

            Self(std::env::temp_dir().join(format!(
                "lunaria-create-project-test-{}-{unique_id}-{sequence}",
                std::process::id(),
            )))
        }
    }

    impl Drop for TestDirectory {
        fn drop(&mut self) {
            let _ = std::fs::remove_dir_all(&self.0);
        }
    }

    #[tokio::test]
    async fn creates_project_and_serializes_it_for_the_frontend() {
        let test_directory = TestDirectory::new();
        let database = db::init_db(&test_directory.0.join("app-data"))
            .await
            .expect("test database should initialize");
        let project_path = test_directory.0.join("projects").join("Moonlit Echoes");

        let created_project = create_project(
            &database,
            "Moonlit Echoes".to_owned(),
            project_path.to_string_lossy().into_owned(),
        )
        .await
        .expect("project should be created");

        assert!(project_path.is_dir());

        let persisted_project = project::Entity::find_by_id(created_project.id)
            .one(&database)
            .await
            .expect("project query should succeed")
            .expect("created project should be persisted");

        assert_eq!(persisted_project, created_project);

        let frontend_payload =
            serde_json::to_value(&created_project).expect("project should serialize");

        assert_eq!(frontend_payload["projectName"], "Moonlit Echoes");
        assert_eq!(
            frontend_payload["projectPath"],
            project_path.to_string_lossy().as_ref()
        );
        assert!(frontend_payload.get("createdAt").is_some());
        assert!(frontend_payload.get("lastOpenedAt").is_some());
        assert!(frontend_payload.get("project_name").is_none());

        database
            .close()
            .await
            .expect("test database should close cleanly");
    }

    #[tokio::test]
    async fn returns_a_structured_error_for_an_already_registered_path() {
        let test_directory = TestDirectory::new();
        let database = db::init_db(&test_directory.0.join("app-data"))
            .await
            .expect("test database should initialize");
        let project_path = test_directory.0.join("projects").join("Moonlit Echoes");
        let project_path_string = project_path.to_string_lossy().into_owned();

        create_project(
            &database,
            "Moonlit Echoes".to_owned(),
            project_path_string.clone(),
        )
        .await
        .expect("first project should be created");

        let error = create_project(
            &database,
            "Another Project".to_owned(),
            project_path_string.clone(),
        )
        .await
        .expect_err("duplicate project path should be rejected");
        let frontend_payload = serde_json::to_value(error).expect("error should serialize");

        assert_eq!(frontend_payload["code"], "PROJECT_PATH_ALREADY_REGISTERED");
        assert_eq!(
            frontend_payload["params"]["projectPath"],
            project_path_string
        );

        database
            .close()
            .await
            .expect("test database should close cleanly");
    }
}
