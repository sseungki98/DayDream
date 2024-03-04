const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  roomId: String,
  createdAt: {
    type: Date,
    deafult: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  lastChat: String,
  timeOfLastChat: Date,
  users: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    required: [true, "room must have users"],
  },
  chats: [[String, String]],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
