defmodule ChatBackendWeb.RoomChannel do
  use ChatBackendWeb, :channel

  # Allow joining any "room:lobby" channel
  def join("room:" <> _room_id, _params, socket) do
    {:ok, socket}
  end

  # Handle incoming messages and broadcast them to all subscribers
  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast(socket, "new_msg", %{
      body: body,
      user: socket.assigns.user || "anon"
    })
    {:noreply, socket}
  end
end
