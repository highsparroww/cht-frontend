// src/main.rs
use axum::{
    extract::{Json, State},
    http::{header, Method, HeaderValue},
    middleware::from_fn,
    response::Json as ResponseJson,
    routing::post,
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use std::sync::Arc;
use tower_http::cors::CorsLayer;
use tracing::info;
use uuid::Uuid;
use validator::Validate;

mod auth;
mod config;
mod error;
mod middleware;
mod models;

use auth::{create_jwt, hash_password, verify_password};
use config::{Config, USERNAME_REGEX};
use error::{AppError, AppResult};
use models::User;

// Application state
#[derive(Clone)]
pub struct AppState {
    db: PgPool,
    config: Arc<Config>,
}

// Request/Response structs with validation
#[derive(Deserialize, Validate)]
pub struct SignupRequest {
    #[validate(length(min = 3, max = 50, message = "Username must be 3-50 characters"))]
    #[validate(regex(path = "USERNAME_REGEX", message = "Username can only contain letters, numbers, and underscores"))]
    name: String,
    
    #[validate(length(min = 6, max = 128, message = "Password must be 6-128 characters"))]
    password: String,
}

#[derive(Deserialize, Validate)]
pub struct LoginRequest {
    #[validate(length(min = 3, max = 50))]
    name: String,
    
    #[validate(length(min = 6, max = 128))]
    password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    token: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    user: Option<UserResponse>,
}

#[derive(Serialize)]
pub struct UserResponse {
    id: Uuid,
    username: String,
    created_at: chrono::DateTime<chrono::Utc>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load environment and initialize tracing
    dotenv::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    // Load configuration
    let config = Arc::new(Config::from_env()?);
    
    // Create optimized database connection pool
    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(20)
        .min_connections(5)
        .acquire_timeout(std::time::Duration::from_secs(10))
        .idle_timeout(std::time::Duration::from_secs(600))
        .max_lifetime(std::time::Duration::from_secs(1800))
        .connect(&config.database_url)
        .await?;

    // Run database migrations (if any)
    sqlx::migrate!().run(&pool).await?;

    let app_state = AppState { 
        db: pool, 
        config: config.clone() 
    };

    // Configure CORS with specific origins for security
    let cors = CorsLayer::new()
        .allow_origin(
            config.allowed_origins
                .iter()
                .map(|origin| origin.parse::<HeaderValue>().unwrap())
                .collect::<Vec<_>>()
        )
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION]);

    // Build router with middleware
    let app = Router::new()
        .route("/signup", post(signup))
        .route("/login", post(login))
        .route("/health", axum::routing::get(health_check))
        .layer(from_fn(middleware::logging_middleware))
        .layer(cors)
        .with_state(app_state);

    // Create optimized listener
    let listener = tokio::net::TcpListener::bind(
        format!("{}:{}", config.server_host, config.server_port)
    ).await?;
    
    info!(
        "🚀 High-performance Rust server running on http://{}:{}",
        config.server_host, config.server_port
    );
    
    // Start server with graceful shutdown
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

// Optimized signup handler with comprehensive validation
async fn signup(
    State(state): State<AppState>,
    Json(payload): Json<SignupRequest>,
) -> AppResult<ResponseJson<AuthResponse>> {
    // Validate input
    payload.validate()?;

    let username = payload.name.trim().to_lowercase();
    
    // Check if user exists (optimized query)
    let user_exists = sqlx::query_scalar::<_, bool>(
        "SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)"
    )
    .bind(&username)
    .fetch_one(&state.db)
    .await?;

    if user_exists {
        return Err(AppError::Conflict("Username already exists".to_string()));
    }

    // Hash password (optimized cost for production)
    let password_hash = hash_password(&payload.password).await?;

    // Create user with transaction for consistency
    let mut tx = state.db.begin().await?;
    
    let user_id = sqlx::query_scalar::<_, Uuid>(
        r#"
        INSERT INTO users (username, password_hash) 
        VALUES ($1, $2) 
        RETURNING id
        "#
    )
    .bind(&username)
    .bind(&password_hash)
    .fetch_one(&mut *tx)
    .await?;

    tx.commit().await?;

    // Generate JWT token
    let token = create_jwt(&user_id, &username, &state.config.jwt_secret)?;

    info!("New user registered: {}", username);

    Ok(ResponseJson(AuthResponse {
        message: "User registered successfully!".to_string(),
        token: Some(token),
        user: Some(UserResponse {
            id: user_id,
            username,
            created_at: chrono::Utc::now(),
        }),
    }))
}

// Optimized login handler
async fn login(
    State(state): State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> AppResult<ResponseJson<AuthResponse>> {
    // Validate input
    payload.validate()?;

    let username = payload.name.trim().to_lowercase();

    // Fetch user with single query (includes password hash)
    let user = sqlx::query_as::<_, User>(
        r#"
        SELECT id, username, password_hash, created_at, updated_at, is_active
        FROM users 
        WHERE username = $1 AND is_active = true
        "#
    )
    .bind(&username)
    .fetch_optional(&state.db)
    .await?;

    let user = user.ok_or_else(|| AppError::Unauthorized("Invalid credentials".to_string()))?;

    // Verify password (constant-time comparison)
    if !verify_password(&payload.password, &user.password_hash).await? {
        return Err(AppError::Unauthorized("Invalid credentials".to_string()));
    }

    // Generate JWT token
    let token = create_jwt(&user.id, &user.username, &state.config.jwt_secret)?;

    info!("User logged in: {}", username);

    Ok(ResponseJson(AuthResponse {
        message: "Login successful!".to_string(),
        token: Some(token),
        user: Some(UserResponse {
            id: user.id,
            username: user.username,
            created_at: user.created_at,
        }),
    }))
}

// Health check endpoint
async fn health_check() -> ResponseJson<serde_json::Value> {
    ResponseJson(serde_json::json!({
        "status": "healthy",
        "service": "incognito-rust-auth",
        "version": env!("CARGO_PKG_VERSION"),
        "timestamp": chrono::Utc::now()
    }))
}

// Graceful shutdown signal
async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {
            info!("Received Ctrl+C, shutting down gracefully...");
        },
        _ = terminate => {
            info!("Received terminate signal, shutting down gracefully...");
        },
    }
}