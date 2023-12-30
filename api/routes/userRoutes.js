const express = require("express");
const router = express.Router();
const {
  updateOne,
  getOne,
  deleteOne,
  createOne,
} = require("../controllers/handlerFactory");

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restriction,
} = require("../controllers/authController");

const {
  getAllUsers,

  deleteMe,
  updateMe,
  uploadUserImage,
  resizeUserImage,
  addCourse,
  withdrawCourse,
} = require("../controllers/userController");

const userModel = require("../models/userModel");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

router
  .route("/")
  .get(protect, restriction("admin"), getAllUsers)
  .post(protect, restriction("admin"), createOne(userModel))
  .delete(protect, restriction("student", "instructor"), deleteMe)
  .patch(protect, uploadUserImage, resizeUserImage, updateMe);

router.route("/addCourse").patch(protect, restriction("student"), addCourse);

router
  .route("/withDrawCourse")
  .patch(protect, restriction("student"), withdrawCourse);
  
router
  .route("/:id")
  .get(getOne(userModel, "courses"))
  .patch(protect, restriction("admin"), updateOne(userModel))
  .delete(protect, restriction("admin"), deleteOne(userModel));

module.exports = router;
