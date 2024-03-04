const Room = require("../models/roomModel");
const User = require("../models/userModel");
const { userSocket } = require("./socketIdStore");

module.exports.createRoomName = function (id1, id2) {
  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
};

exports.addSocketEvent = async (socket) => {
  socket.on("error", (error) => {
    console.error(error);
  });

  socket.on("login", async (data) => {
    userSocket[data] = socket;
    const user = await User.findById(data);
    const rooms = user.chatRooms;
    if (rooms) {
      rooms.forEach((room) => {
        socket.join(room);
      });
    }
  });

  socket.on("makeRoom", async (data) => {
    const { sender, receiver } = data;
    const roomName = this.createRoomName(sender, receiver);
    userSocket[sender].join(roomName);
    const sendUser = await User.findById(sender);
    const receiveUser = await User.findById(receiver);
    const room = await Room.findOne({
      roomId: this.createRoomName(sender, receiver),
    });
    if (!room) {
      await Room.create({
        name: receiveUser.name,
        roomId: roomName,
        updatedAt: Date.now(),
        users: [sender, receiver],
      });
      sendUser.chatRooms.push(roomName);
      receiveUser.chatRooms.push(roomName);
      await User.findByIdAndUpdate(sender, { $push: { chatRooms: roomName } });
      await User.findByIdAndUpdate(receiver, {
        $push: { chatRooms: roomName },
      });
    }
  });
};
