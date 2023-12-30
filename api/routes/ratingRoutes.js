const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");

const { ratingModel } = require("../models/ratingModel");

const {
  getCourseRatings,
  addCourseRatings,
} = require("../controllers/ratingController"); //get a single course ratings

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(ratingModel))
  .post(protect, restriction("student"), addCourseRatings);

router.route("/getCourseRatings/:courseId").get(getCourseRatings);

router
  .route("/:id")
  .get(getOne(ratingModel))
  .put(protect, restriction("admin"), updateOne(ratingModel))
  .delete(protect, restriction("admin"), deleteOne(ratingModel));
  
module.exports = router;
