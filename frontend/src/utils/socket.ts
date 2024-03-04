import { useSocket } from "../stores/useSocket";

const io = require("socket.io-client");
const BASE_URL = "http://127.0.0.1:8000";

export function connectSocket() {
  const { currentSocket, setSocket } = useSocket.getState();
  if (currentSocket === null) {
    const socket = io(BASE_URL, {
      path: "/socket.io",
      cors: {
        origin: "*",
      },
    });

    socket.on("news", function (data: string) {
      console.log(data);
    });

    socket.on("reply", (data: string) => {
      console.log("reply:", data);
    });

    socket.on("login", (data: string) => {
      console.log("loginData:", data);
    });

    socket.on("sendMessage", (data: string) => {
      console.log("message: ", data);
    });

    setSocket(socket);
    return socket;
  }
}

export function getSocket() {
  const { currentSocket } = useSocket.getState();

  if (currentSocket) {
    return currentSocket;
  }
}
