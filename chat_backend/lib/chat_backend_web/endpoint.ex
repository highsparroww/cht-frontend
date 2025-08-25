defmodule ChatBackendWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :chat_backend

  @session_options [
    store: :cookie,
    key: "_chat_backend_key",
    signing_salt: "dCRA0Z7A",
    same_site: "Lax"
  ]

  # ===== Add your chat socket here =====
  socket "/socket", ChatBackendWeb.UserSocket,
    websocket: true,
    longpoll: false

  # LiveView socket (already exists)
  socket "/live", Phoenix.LiveView.Socket,
    websocket: [connect_info: [session: @session_options]],
    longpoll: [connect_info: [session: @session_options]]

  plug Plug.Static,
    at: "/",
    from: :chat_backend,
    gzip: not code_reloading?,
    only: ChatBackendWeb.static_paths()

  if code_reloading? do
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :chat_backend
  end

  plug Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug ChatBackendWeb.Router
end
