mod command;
mod db;
mod domain;
mod dto;
mod entity;
mod error;
mod repository;
mod service;
mod state;
mod util;

use command::character::create_character;
use command::character::list_character;
use command::character_sprite::create_character_sprite;
use command::character_sprite_set::create_character_sprite_set;
use command::character_sprite_set::list_sprite_set;
use command::project::create_project;
use command::project::fetch_latest_opened_project;
use command::project::open_project;
use command::project::query_recent_opened_project;
use state::project_state::ProjectState;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir()?;
            let db = tauri::async_runtime::block_on(db::init_db(&app_data_dir))?;
            app.manage(db);
            app.manage(ProjectState::default());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // project
            create_project,
            open_project,
            fetch_latest_opened_project,
            query_recent_opened_project,
            // character
            create_character,
            list_character,
            // character_sprite
            create_character_sprite_set,
            create_character_sprite,
            list_sprite_set
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
