use std::time::{SystemTime, UNIX_EPOCH};

/// Returns the current Unix timestamp in seconds.
pub fn current_timestamp() -> Result<i64, std::time::SystemTimeError> {
    let created_at = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() as i64;

    Ok(created_at)
}
