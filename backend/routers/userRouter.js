const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

module.exports = router;
