const express = require("express");
const router = express.Router();
const { protect, restriction } = require("../controllers/authController");

const {
  updateCourseProgress,
  getCourseProgress,
} = require("../controllers/courseProgressController");

router.route("/").put(protect, restriction("student"), updateCourseProgress);
router.route("/:courseId").get(protect, getCourseProgress);

module.exports = router;
