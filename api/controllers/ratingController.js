const { courseModel } = require("../models/courseModel");
const { ratingModel } = require("../models/ratingModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.getCourseRatings = catchAsync(async (req, res, next) => {
  const found = await ratingModel.find({ course: req.params.courseId });

  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});

exports.addCourseRatings = catchAsync(async (req, res, next) => {
  let found = await ratingModel.find({
    course: req.body.course,
    user: req.user.id,
  });
  
  if (found.length > 0) {
    return next(new AppError("Already reviewed this course!", 403));
  }
  found = await ratingModel.create({
    rating: req.body.rating,
    course: req.body.course,
    review: req.body.review,
    user: req.user.id,
  });
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});
