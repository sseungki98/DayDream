const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllChatRoomsIds = catchAsync(async (req, res, next) => {
  const { chatRooms } = req.user;

  res.status(200).json({
    status: "success",
    length: chatRooms.length,
    data: {
      chatRooms,
    },
  });
});

exports.getChatsFromRoom = catchAsync(async (req, res, next) => {
  const roomId = req.params.id;
  const room = await Room.findOne({ roomId: roomId });

  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
});
