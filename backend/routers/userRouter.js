const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const { uploadImage, upload } = require("../utils/uploadImage");

const router = express.Router();

router
  .route("/signup")
  .post(upload.single("image"), uploadImage, authController.signup);
router.route("/login").post(authController.login);

router.route("/").get(userController.getAllUser);
router
  .route("/updateMe")
  .patch(authController.protect, userController.updateMe);

router.route("/me").get(authController.protect, userController.getMe);

router
  .route("/todayMatch")
  .get(
    authController.protect,
    authController.restritTo("user"),
    userController.getTodayMatchUsers,
  );

router
  .route("/myChatsInfo")
  .get(authController.protect, userController.getMyChatRoomsInfo);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restritTo("admin"),
    userController.getOneUser,
  );

module.exports = router;
