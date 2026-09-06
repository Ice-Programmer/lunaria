use super::{init_db, Db};
use crate::{
    service::project_service::{create_project, open_project},
    state::project_state::{CurrentProject, ProjectState},
};
use sea_orm::{ConnectionTrait, DatabaseConnection, DbBackend, Statement};
use std::{fs, path::Path, sync::Arc};

struct TestState {
    app: Db,
    projects: ProjectState,
}

async fn init_state(directory: &Path) -> TestState {
    TestState {
        app: init_db(directory).await.unwrap(),
        projects: ProjectState::default(),
    }
}

fn sql(text: impl Into<String>) -> Statement {
    Statement::from_string(DbBackend::Sqlite, text.into())
}

async fn execute(db: &DatabaseConnection, statement: &str) {
    db.execute_raw(sql(statement)).await.unwrap();
}

async fn number(db: &DatabaseConnection, statement: &str) -> i64 {
    db.query_one_raw(sql(statement))
        .await
        .unwrap()
        .unwrap()
        .try_get_by_index(0)
        .unwrap()
}

async fn create_fixture(state: &TestState, directory: &Path) -> Arc<CurrentProject> {
    let project = create_project(
        &state.app,
        &state.projects,
        "Fixture project".to_owned(),
        directory.to_string_lossy().to_string(),
    )
    .await
    .unwrap();
    state.projects.project(project.id).await.unwrap()
}

async fn populate(project: &CurrentProject) {
    execute(&project.db, r#"INSERT INTO character (id,character_code,name,tags,avatar_path,created_at,updated_at) VALUES (1,'hero','Fixture character','["main"]','characters/1/avatar.png',11,12)"#).await;
    execute(&project.db, "INSERT INTO character_sprite_set (id,character_id,sprite_set_code,sprite_set_name,created_at,updated_at) VALUES (1,1,'daily','Fixture outfit',21,22)").await;
    execute(&project.db, "INSERT INTO character_sprite (id,character_id,sprite_set_id,sprite_code,sprite_name,image_path,width,height,is_default,sort_order,created_at,updated_at) VALUES (1,1,1,'smile','Fixture sprite','characters/1/sprites/1/smile.png',512,768,1,3,31,32)").await;
    for (relative, bytes) in [
        ("characters/1/avatar.png", b"fixture avatar".as_slice()),
        (
            "characters/1/sprites/1/smile.png",
            b"fixture sprite".as_slice(),
        ),
    ] {
        let path = Path::new(&project.info.project_path).join(relative);
        fs::create_dir_all(path.parent().unwrap()).unwrap();
        fs::write(path, bytes).unwrap();
    }
}

async fn contents(db: &DatabaseConnection) -> Vec<String> {
    let mut contents = Vec::new();
    for (table, fields) in [
        ("character", "'id',id,'character_code',character_code,'name',name,'tags',tags,'avatar_path',avatar_path,'created_at',created_at,'updated_at',updated_at"),
        ("character_sprite_set", "'id',id,'character_id',character_id,'sprite_set_code',sprite_set_code,'sprite_set_name',sprite_set_name,'created_at',created_at,'updated_at',updated_at"),
        ("character_sprite", "'id',id,'character_id',character_id,'sprite_set_id',sprite_set_id,'sprite_code',sprite_code,'sprite_name',sprite_name,'image_path',image_path,'width',width,'height',height,'is_default',is_default,'sort_order',sort_order,'created_at',created_at,'updated_at',updated_at"),
    ] {
        for row in db.query_all_raw(sql(format!("SELECT json_object({fields}) AS row FROM {table} ORDER BY id"))).await.unwrap() {
            contents.push(format!("{table}:{}", row.try_get::<String>("", "row").unwrap()));
        }
    }
    contents
}

async fn close(state: TestState) {
    if let Some(project) = state.projects.current.into_inner() {
        project.db.clone().close().await.unwrap();
    }
    state.app.close().await.unwrap();
}

fn copy_tree(source: &Path, destination: &Path) {
    fs::create_dir_all(destination).unwrap();
    for entry in fs::read_dir(source).unwrap() {
        let entry = entry.unwrap();
        let target = destination.join(entry.file_name());
        if entry.file_type().unwrap().is_dir() {
            copy_tree(&entry.path(), &target);
        } else {
            fs::copy(entry.path(), target).unwrap();
        }
    }
}

#[tokio::test]
async fn new_project_has_its_own_schema_and_enforces_constraints() {
    let root = tempfile::tempdir().unwrap();
    let state = init_state(&root.path().join("app")).await;
    let project = create_fixture(&state, &root.path().join("project")).await;
    populate(&project).await;
    assert_eq!(number(&project.db, "PRAGMA user_version").await, 1);
    assert_eq!(
        number(&project.db, "PRAGMA application_id").await,
        0x4c554e41
    );
    assert_eq!(
        number(&project.db, "SELECT COUNT(*) FROM project_meta WHERE id=1").await,
        1
    );
    assert_eq!(number(&state.app, "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name<>'project'").await, 0);
    for table in ["character", "character_sprite_set", "character_sprite"] {
        let columns = project
            .db
            .query_all_raw(sql(format!("PRAGMA table_info({table})")))
            .await
            .unwrap();
        assert!(!columns
            .iter()
            .any(|column| column.try_get::<String>("", "name").unwrap() == "project_id"));
    }
    let mut character_index = None;
    for index in project
        .db
        .query_all_raw(sql("PRAGMA index_list(character_sprite)"))
        .await
        .unwrap()
    {
        if index.try_get::<i64>("", "unique").unwrap() != 0 {
            continue;
        }
        let name = index.try_get::<String>("", "name").unwrap();
        let escaped = name.replace('"', "\"\"");
        let columns = project
            .db
            .query_all_raw(sql(format!("PRAGMA index_info(\"{escaped}\")")))
            .await
            .unwrap();
        if columns.len() == 1 && columns[0].try_get::<String>("", "name").unwrap() == "character_id"
        {
            character_index = Some(escaped);
            break;
        }
    }
    let character_index = character_index.expect("character_id needs a non-unique lookup index");
    assert_eq!(
        number(
            &project.db,
            &format!("SELECT COUNT(*) FROM character_sprite INDEXED BY \"{character_index}\" WHERE character_id=1")
        )
        .await,
        1
    );
    let before = contents(&project.db).await;
    for invalid in [
        "INSERT INTO project_meta (id,project_name,created_at) VALUES (2,'Extra metadata',1)",
        "UPDATE project_meta SET project_name=NULL WHERE id=1",
        "UPDATE project_meta SET created_at=NULL WHERE id=1",
        "INSERT INTO character (id,character_code,name,tags,created_at,updated_at) VALUES (2,'hero','Duplicate','[]',1,1)",
        "INSERT INTO character_sprite_set (id,character_id,sprite_set_code,sprite_set_name,created_at,updated_at) VALUES (2,1,'daily','Duplicate',1,1)",
        "INSERT INTO character_sprite (id,character_id,sprite_set_id,sprite_code,sprite_name,image_path,width,height,is_default,sort_order,created_at,updated_at) VALUES (2,1,1,'smile','Duplicate','unused.png',1,1,0,0,1,1)",
        "INSERT INTO character_sprite_set (id,character_id,sprite_set_code,sprite_set_name,created_at,updated_at) VALUES (2,999,'orphan','Invalid',1,1)",
        "INSERT INTO character_sprite (id,character_id,sprite_set_id,sprite_code,sprite_name,image_path,width,height,is_default,sort_order,created_at,updated_at) VALUES (2,1,999,'orphan','Invalid','unused.png',1,1,0,0,1,1)",
    ] {
        assert!(project.db.execute_raw(sql(invalid)).await.is_err());
    }
    let metadata = project
        .db
        .query_one_raw(sql("SELECT id,project_name,created_at FROM project_meta"))
        .await
        .unwrap()
        .unwrap();
    assert_eq!(metadata.try_get::<i64>("", "id").unwrap(), 1);
    assert_eq!(
        metadata.try_get::<String>("", "project_name").unwrap(),
        project.info.project_name
    );
    assert_eq!(
        metadata.try_get::<i64>("", "created_at").unwrap(),
        project.info.created_at
    );
    assert_eq!(contents(&project.db).await, before);
    execute(&project.db, "INSERT INTO character (id,character_code,name,tags,created_at,updated_at) VALUES (2,'support','Other character','[]',1,1)").await;
    execute(&project.db, "INSERT INTO character_sprite_set (id,character_id,sprite_set_code,sprite_set_name,created_at,updated_at) VALUES (2,2,'daily','Other outfit',1,1)").await;
    execute(&project.db, "INSERT INTO character_sprite_set (id,character_id,sprite_set_code,sprite_set_name,created_at,updated_at) VALUES (3,1,'formal','Second outfit for the same character',1,1)").await;
    execute(&project.db, "INSERT INTO character_sprite (id,character_id,sprite_set_id,sprite_code,sprite_name,image_path,width,height,is_default,sort_order,created_at,updated_at) VALUES (2,1,3,'smile','Other sprite','unused.png',1,1,0,0,1,1)").await;
    assert_eq!(
        number(
            &project.db,
            "SELECT COUNT(*) FROM character_sprite_set WHERE sprite_set_code='daily'"
        )
        .await,
        2
    );
    assert_eq!(
        number(
            &project.db,
            "SELECT COUNT(*) FROM character_sprite WHERE sprite_code='smile'"
        )
        .await,
        2
    );
    execute(&project.db, "DELETE FROM character_sprite_set WHERE id=3").await;
    execute(&project.db, "DELETE FROM character WHERE id=2").await;
    assert_eq!(contents(&project.db).await, before);
    execute(&project.db, "UPDATE character SET id=7 WHERE id=1").await;
    assert_eq!(
        number(
            &project.db,
            "SELECT character_id FROM character_sprite_set WHERE id=1"
        )
        .await,
        7
    );
    assert_eq!(
        number(
            &project.db,
            "SELECT character_id FROM character_sprite WHERE id=1"
        )
        .await,
        7
    );
    execute(
        &project.db,
        "UPDATE character_sprite_set SET id=8 WHERE id=1",
    )
    .await;
    assert_eq!(
        number(
            &project.db,
            "SELECT sprite_set_id FROM character_sprite WHERE id=1"
        )
        .await,
        8
    );
    execute(&project.db, "DELETE FROM character WHERE id=7").await;
    assert_eq!(
        number(&project.db, "SELECT COUNT(*) FROM character_sprite_set").await,
        0
    );
    assert_eq!(
        number(&project.db, "SELECT COUNT(*) FROM character_sprite").await,
        0
    );
    assert!(project
        .db
        .query_all_raw(sql("PRAGMA foreign_key_check"))
        .await
        .unwrap()
        .is_empty());
    close(state).await;
}

#[tokio::test]
async fn project_connections_isolate_identical_local_ids_and_codes() {
    let root = tempfile::tempdir().unwrap();
    let state = init_state(&root.path().join("app")).await;
    let first = create_fixture(&state, &root.path().join("first")).await;
    populate(&first).await;
    let second = create_fixture(&state, &root.path().join("second")).await;
    populate(&second).await;
    assert_ne!(first.info.id, second.info.id);
    execute(
        &first.db,
        "UPDATE character SET name='First project' WHERE id=1",
    )
    .await;
    execute(
        &second.db,
        "UPDATE character SET name='Second project' WHERE id=1",
    )
    .await;
    assert_ne!(contents(&first.db).await, contents(&second.db).await);
    for project in [&first, &second] {
        assert_eq!(
            number(
                &project.db,
                "SELECT COUNT(*) FROM character WHERE id=1 AND character_code='hero'"
            )
            .await,
            1
        );
    }
    assert!(state.projects.project(first.info.id).await.is_err());
    assert!(state.projects.project(i64::MAX).await.is_err());
    assert!(state.projects.project(second.info.id).await.is_ok());
    first.db.clone().close().await.unwrap();
    close(state).await;
}

#[tokio::test]
async fn reopening_preserves_project_contents() {
    let root = tempfile::tempdir().unwrap();
    let app_directory = root.path().join("app");
    let directory = root.path().join("project");
    let state = init_state(&app_directory).await;
    let project = create_fixture(&state, &directory).await;
    populate(&project).await;
    execute(
        &project.db,
        "UPDATE character SET name='Edited fixture',updated_at=88 WHERE id=1",
    )
    .await;
    let expected = contents(&project.db).await;
    let original_id = project.info.id;
    let original_created_at = project.info.created_at;
    close(state).await;
    drop(project);

    let state = init_state(&app_directory).await;
    let opened = open_project(
        &state.app,
        &state.projects,
        directory.to_string_lossy().to_string(),
    )
    .await
    .unwrap();
    assert_eq!(opened.id, original_id);
    assert_eq!(opened.created_at, original_created_at);
    let project = state.projects.project(opened.id).await.unwrap();
    assert_eq!(contents(&project.db).await, expected);
    assert_eq!(number(&state.app, "SELECT COUNT(*) FROM project").await, 1);
    close(state).await;
}

#[tokio::test]
async fn copied_and_moved_projects_open_in_a_fresh_application() {
    let root = tempfile::tempdir().unwrap();
    let directory = root.path().join("original");
    let state = init_state(&root.path().join("original-app")).await;
    let project = create_fixture(&state, &directory).await;
    populate(&project).await;
    let expected = contents(&project.db).await;
    let created_at = project.info.created_at;
    close(state).await;
    drop(project);

    let copied = root.path().join("copied");
    copy_tree(&directory, &copied);
    let moved = root.path().join("moved");
    fs::rename(&directory, &moved).unwrap();
    for (index, directory) in [copied, moved].into_iter().enumerate() {
        let state = init_state(&root.path().join(format!("fresh-app-{index}"))).await;
        let opened = open_project(
            &state.app,
            &state.projects,
            directory.to_string_lossy().to_string(),
        )
        .await
        .unwrap();
        assert_eq!(opened.project_name, "Fixture project");
        assert_eq!(opened.created_at, created_at);
        assert_eq!(
            Path::new(&opened.project_path),
            fs::canonicalize(&directory).unwrap()
        );
        let project = state.projects.project(opened.id).await.unwrap();
        assert_eq!(contents(&project.db).await, expected);
        assert_eq!(
            fs::read(directory.join("characters/1/avatar.png")).unwrap(),
            b"fixture avatar"
        );
        assert_eq!(
            fs::read(directory.join("characters/1/sprites/1/smile.png")).unwrap(),
            b"fixture sprite"
        );
        close(state).await;
    }
}

#[tokio::test]
async fn missing_or_invalid_project_databases_are_never_replaced() {
    for case in ["missing", "invalid", "future", "incomplete"] {
        let root = tempfile::tempdir().unwrap();
        let directory = root.path().join("project");
        fs::create_dir(&directory).unwrap();
        let database = directory.join("lunaria.db");
        match case {
            "missing" => {}
            "invalid" => fs::write(&database, b"This is not a SQLite database").unwrap(),
            "future" | "incomplete" => {
                let state = init_state(&root.path().join("setup-app")).await;
                let project = create_fixture(&state, &directory).await;
                let change = if case == "future" {
                    "PRAGMA user_version=999"
                } else {
                    "DROP TABLE character_sprite"
                };
                execute(&project.db, change).await;
                close(state).await;
            }
            _ => unreachable!(),
        }
        let before = fs::read(&database).ok();
        let state = init_state(&root.path().join("fresh-app")).await;
        assert!(
            open_project(
                &state.app,
                &state.projects,
                directory.to_string_lossy().to_string()
            )
            .await
            .is_err(),
            "accepted {case} database"
        );
        assert_eq!(fs::read(&database).ok(), before, "changed {case} database");
        assert_eq!(number(&state.app, "SELECT COUNT(*) FROM project").await, 0);
        close(state).await;
    }
}

#[tokio::test]
async fn path_aliases_reuse_the_index_and_cannot_replace_a_project() {
    let root = tempfile::tempdir().unwrap();
    let directory = root.path().join("project");
    let state = init_state(&root.path().join("app")).await;
    let project = create_fixture(&state, &directory).await;
    populate(&project).await;
    let expected = contents(&project.db).await;
    let project_id = project.info.id;
    let nested = directory.join("nested");
    fs::create_dir(&nested).unwrap();
    let alias = nested.join("..").to_string_lossy().to_string();
    let opened = open_project(&state.app, &state.projects, alias.clone())
        .await
        .unwrap();
    assert_eq!(opened.id, project_id);
    assert!(create_project(
        &state.app,
        &state.projects,
        "Must not replace".to_owned(),
        alias
    )
    .await
    .is_err());
    let reopened = state.projects.project(project_id).await.unwrap();
    assert_eq!(contents(&reopened.db).await, expected);
    assert_eq!(number(&state.app, "SELECT COUNT(*) FROM project").await, 1);
    project.db.clone().close().await.unwrap();
    close(state).await;

    let fresh = init_state(&root.path().join("another-app")).await;
    assert!(create_project(
        &fresh.app,
        &fresh.projects,
        "Must not replace".to_owned(),
        directory.to_string_lossy().to_string()
    )
    .await
    .is_err());
    assert_eq!(number(&fresh.app, "SELECT COUNT(*) FROM project").await, 0);
    let opened = open_project(
        &fresh.app,
        &fresh.projects,
        directory.to_string_lossy().to_string(),
    )
    .await
    .unwrap();
    assert_eq!(
        contents(&fresh.projects.project(opened.id).await.unwrap().db).await,
        expected
    );
    close(fresh).await;
}

#[tokio::test]
async fn obsolete_database_files_do_not_populate_or_prevent_initialization() {
    let root = tempfile::tempdir().unwrap();
    let app_directory = root.path().join("app");
    fs::create_dir(&app_directory).unwrap();
    let obsolete = [
        (
            app_directory.join("lunaria.db"),
            b"unrelated old database".as_slice(),
        ),
        (
            app_directory.join("lunaria-legacy-backup.db"),
            b"unrelated old backup".as_slice(),
        ),
    ];
    for (path, bytes) in &obsolete {
        fs::write(path, bytes).unwrap();
    }
    for _ in 0..2 {
        let state = init_state(&app_directory).await;
        assert_eq!(number(&state.app, "SELECT COUNT(*) FROM project").await, 0);
        assert!(state.projects.project(1).await.is_err());
        for (path, bytes) in &obsolete {
            assert_eq!(fs::read(path).unwrap(), *bytes);
        }
        close(state).await;
    }
}
