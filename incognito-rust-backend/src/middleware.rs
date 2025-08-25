
use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
};
use tracing::info;

pub async fn logging_middleware(request: Request, next: Next) -> Response {
    let method = request.method().clone();
    let uri = request.uri().clone();
    
    let start = std::time::Instant::now();
    let response = next.run(request).await;
    let elapsed = start.elapsed();
    
    info!(
        "{} {} - {} - {:.2}ms",
        method,
        uri,
        response.status(),
        elapsed.as_secs_f64() * 1000.0
    );
    
    response
}