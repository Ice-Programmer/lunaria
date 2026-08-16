mod command;
mod db;
mod entity;
mod error;
mod service;
mod util;
mod state;

use command::greet::greeting;
use command::project::create_project;
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
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greeting, create_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
