
use crate::error::{AppError, AppResult};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // user_id
    pub username: String,
    pub exp: usize,
    pub iat: usize,
}

// Optimized password hashing (async to not block)
pub async fn hash_password(password: &str) -> AppResult<String> {
    let password = password.to_string();
    tokio::task::spawn_blocking(move || {
        bcrypt::hash(password, 12) // Cost 12 for production security
    })
    .await
    .map_err(|_| AppError::Internal("Password hashing failed".to_string()))?
    .map_err(|_| AppError::Internal("Password hashing failed".to_string()))
}

// Optimized password verification (async to not block)
pub async fn verify_password(password: &str, hash: &str) -> AppResult<bool> {
    let password = password.to_string();
    let hash = hash.to_string();
    tokio::task::spawn_blocking(move || {
        bcrypt::verify(password, &hash)
    })
    .await
    .map_err(|_| AppError::Internal("Password verification failed".to_string()))?
    .map_err(|_| AppError::Internal("Password verification failed".to_string()))
}

// JWT token creation
pub fn create_jwt(user_id: &Uuid, username: &str, secret: &str) -> AppResult<String> {
    let now = chrono::Utc::now();
    let exp = now + chrono::Duration::hours(24); // 24 hour expiry
    
    let claims = Claims {
        sub: user_id.to_string(),
        username: username.to_string(),
        exp: exp.timestamp() as usize,
        iat: now.timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|_| AppError::Internal("Token creation failed".to_string()))
}
