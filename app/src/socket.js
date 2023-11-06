import { io } from "socket.io-client";

let socket;

// const URL =
//   process.env.VITE_NODE_ENV === "production"
//     ? undefined
//     : "http://localhost:4000";

// setSocket(URL);

export function getSocket() {
  return socket;
}
export function setSocket(url) {
  socket = io(url);
}
