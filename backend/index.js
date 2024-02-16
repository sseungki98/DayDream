const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection...");
  // 0 > ok, 1 > on error
  // 바로 프로세스를 종료하는 것이 아닌, 서버에서 펜딩중이나 작업중인 작업을 모두 마친 뒤 종료해야.
  process.exit(1);
});
