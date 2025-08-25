defmodule ChatBackendWeb.UserSocket do
  use Phoenix.Socket

  # Any channel matching "room:*" goes to RoomChannel
  channel "room:*", ChatBackendWeb.RoomChannel

  # Connect any user (for now no authentication)
  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  # Socket id (can be nil for anonymous users)
  def id(_socket), do: nil
end
