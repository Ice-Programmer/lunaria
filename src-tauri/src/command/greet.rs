#[tauri::command]
pub fn greeting(message: &str) -> String {
    format!("Hello {}!", message)
}

#[cfg(test)]
mod tests {
    use crate::command::greet::greeting;

    #[test]
    fn greet_test() {
        println!("{}", greeting("World"));
    }
}