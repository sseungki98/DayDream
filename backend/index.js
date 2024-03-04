const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { setSocketId } = require("./utils/socketIdStore");

dotenv.config({ path: "./config.env" });

const app = require("./app");
const { addSocketEvent, createRoomName } = require("./utils/socketHandler");
const Room = require("./models/roomModel");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  path: "/socket.io",
  cors: {
    origin: "*",
  },
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful!");
  });

const port = 8000;
server.listen(port, () => {
  console.log(`App running on port ${port}`);
});

io.on("connection", (socket) => {
  setSocketId(socket.id);
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    clearInterval(socket.interval);
  });
  socket.on("sendMessage", async (data) => {
    const { sender, receiver, message } = data;
    const roomId = createRoomName(sender, receiver);
    await Room.findOneAndUpdate(
      { roomId: roomId },
      {
        lastChat: message,
        timeOfLastChat: Date.now(),
        $push: { chats: [sender, message] },
      },
    );
    io.to(roomId).emit("sendMessage", [sender, message]);
  });
  addSocketEvent(socket);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection...");
  // 0 > ok, 1 > on error
  // 바로 프로세스를 종료하는 것이 아닌, 서버에서 펜딩중이나 작업중인 작업을 모두 마친 뒤 종료해야.
  process.exit(1);
});
