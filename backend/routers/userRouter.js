const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/").get(userController.getAllUser).post(authController.signup);

module.exports = router;
