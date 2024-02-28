const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { setSocketId } = require("./utils/socketIdStore");

const userSocket = {};
dotenv.config({ path: "./config.env" });

// 실제 오류가 발생할 곳에서 catch 하는 것이 가장 이상적입니다.
// process.on("uncaughtException", (err) => {
//   console.log("uncaught error ...");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

const app = require("./app");
// const app = require("./starter/app");
// const Tour = require("./starter/models/tourModel");
const server = http.createServer(app, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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
    console.log("클라이언트 접속 해제", socket.id);
    clearInterval(socket.interval);
  });

  //* 에러 시
  socket.on("error", (error) => {
    console.error(error);
  });

  socket.emit("newroom");
  socket.on("login", (data) => {
    console.log("data from login", data);
    userSocket[data] = socket.id;
    console.log("usersocketL", userSocket[data]);
    socket.to(userSocket[data]).emit("login", "first connection to you!");
  });
  //* 클라이언트로부터 메시지 수신
  socket.on("reply", (data) => {
    // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
    const { to, message } = data;
    console.log("touser:", userSocket[to]);
    socket.to(userSocket[to]).emit("reply", message);
    console.log(data);
  });

  //* 클라이언트로 메세지 송신
  socket.emit("news", "Hello Socket.IO"); // news라는 이벤트로 문자열을 포함하여 송신
}); // 연결확인

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection...");
  // 0 > ok, 1 > on error
  // 바로 프로세스를 종료하는 것이 아닌, 서버에서 펜딩중이나 작업중인 작업을 모두 마친 뒤 종료해야.
  process.exit(1);
});

// io.on("connection", (socket) => {
//   console.log(socket.id, " connected...");

//   // broadcasting a entering message to everyone who is in the chatroom
//   io.emit("msg", `${socket.id} has entered the chatroom.`);

//   // message receives
//   socket.on("msg", (data) => {
//     console.log(socket.id, ": ", data);
//     // broadcasting a message to everyone except for the sender
//     socket.broadcast.emit("msg", `${socket.id}: ${data}`);
//   });

//   // user connection lost
//   socket.on("disconnect", (data) => {
//     console.log(data);
//     io.emit("msg", `${socket.id} has left the chatroom.`);
//   });
// });

module.exports = {
  server,
  userSocket,
};
