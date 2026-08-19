use crate::entity::project;
use crate::error::AppError;
use crate::util::file::ensure_dir;
use crate::util::time::current_timestamp;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};

pub async fn create_project(
    db: &DatabaseConnection,
    project_name: String,
    filepath: String,
) -> Result<project::Model, AppError> {
    let created_at = current_timestamp()?;

    ensure_dir(&filepath).await?;

    let project = project::ActiveModel {
        project_name: Set(project_name),
        project_path: Set(filepath),
        created_at: Set(created_at),
        last_opened_at: Set(created_at),
        ..Default::default()
    };

    Ok(project.insert(db).await?)
}

#[cfg(test)]
mod tests {
    use super::create_project;
    use crate::{db, entity::project};
    use sea_orm::EntityTrait;
    use std::path::PathBuf;
    use std::time::{SystemTime, UNIX_EPOCH};

    struct TestDirectory(PathBuf);

    impl TestDirectory {
        fn new() -> Self {
            let unique_id = SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .expect("system clock should be after the Unix epoch")
                .as_nanos();

            Self(std::env::temp_dir().join(format!(
                "lunaria-create-project-test-{}-{unique_id}",
                std::process::id()
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
}
