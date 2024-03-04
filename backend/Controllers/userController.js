const Room = require("../models/roomModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      data: users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("유효한 아이디가 아닙니다."), 404);
  }
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("존재하지 않는 유저입니다.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.getTodayMatchUsers = catchAsync(async (req, res, next) => {
  const users = await User.aggregate([
    {
      $match: { active: true, role: "user", _id: { $ne: req.user._id } },
    },
    {
      $sample: { size: 20 },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.getMyChatRoomsInfo = catchAsync(async (req, res, next) => {
  const chatRoomIds = req.user.chatRooms;
  const roomInfos = await Promise.all(
    chatRoomIds.map(async (id) => {
      const info = await Room.findOne({ roomId: id }).select(
        "-chats -__v -updatedAt",
      );
      return info;
    }),
  );

  res.status(200).json({
    status: "success",
    length: roomInfos.length,
    data: {
      roomInfos,
    },
  });
});
