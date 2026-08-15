use std::path::Path;

pub async fn ensure_dir(path: impl AsRef<Path>) -> std::io::Result<()> {
    tokio::fs::create_dir_all(path).await
}
