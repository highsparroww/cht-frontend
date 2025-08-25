// lib/socket.ts
import { Socket } from "phoenix";

const username = `user_${Math.floor(Math.random() * 10000)}`;

export const socket = new Socket("ws://localhost:4000/socket", {
  params: { username },
});

socket.connect();

export function joinRoom(room: string = "lobby") {
  const channel = socket.channel(`room:${room}`, {});

  channel
    .join()
    .receive("ok", () => console.log("✅ joined room:", room))
    .receive("error", (resp) => console.error("❌ join failed:", resp));

  return channel;
}
