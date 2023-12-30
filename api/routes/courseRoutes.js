const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  updateOne,
} = require("../controllers/handlerFactory");

const { courseModel } = require("../models/courseModel");

const {
  getAllCourseData,
  getTop10Courses,
  getCoursesbytag,
  deleteCourse,
} = require("../controllers/courseController");

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(courseModel))
  .post(protect, restriction("instructor", "admin"), createOne(courseModel));
//specialized routes
router.route("/allCourseData/:id").get(getAllCourseData);
router.route("/getTop10Courses").get(getTop10Courses);
router.route("/getCoursesbytag/:tagName").get(getCoursesbytag);

//
router
  .route("/:id")
  .put(protect, restriction("instructor", "admin"), updateOne(courseModel))
  .delete(protect,restriction("instructor", "admin"), deleteCourse);

module.exports = router;
