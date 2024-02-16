const express = require("express");
const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
// const hpp = require("hpp");
const userRouter = require("./routers/userRouter");

//app.js => All about express
const app = express();
// SECURITY HTTP HEADER
app.use(helmet());

// GLOBAL MIDDLEWAREs
// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// FOR BRUTE FORCE ATTACK
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many request from same IP, try later.",
// });
// app.use("/api", limiter);

// global middleware, before route handler
//body parser
app.use(express.json()); // between req and res

// Data sanitization against NoSQL query Injection
// email: {$gt: ""} -> 모든 계정 선택됨
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution

// app.use(
//   hpp({
//     // whitelist -> query에서 여러번 나와도 되는 것들 설정
//     whitelist: [
//       "duration",
//       "ratingsAverage",
//       "ratingsQuantity",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],
//   }),
// );

//serving static files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// ROUTE HANDLERs
// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/reviews", reviewRouter);

// for all http request
// 여가까지 도달한다면, 앞에서 걸러지지 않았기 때문에 우리가 정의한 페이지가 아님
// app.all("*", (req, res, next) => {
//   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   err.status = "fail";
//   err.statusCode = 404;

//   // next 안에 값이 들어간다면 에러로 처리합니다. => 중간의 모든 미들웨어를 스킵
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`));
// });

// app.use(globalErrorHandler);

module.exports = app;
