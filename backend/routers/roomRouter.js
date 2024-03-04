const express = require("express");
const authController = require("../Controllers/authController");
const roomController = require("../Controllers/roomController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, roomController.getAllChatRoomsIds);

router
  .route("/:id")
  .get(authController.protect, roomController.getChatsFromRoom);

module.exports = router;
