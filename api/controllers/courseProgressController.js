const { courseModel } = require("../models/courseModel");
const { courseProgressModel } = require("../models/courseProgressModel");
const { subSectionModel } = require("../models/subSectionModel");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("./../utils/serverResponse");

exports.updateCourseProgress = catchAsync(async (req, res, next) => {
  if (!req.body.courseId || !req.body.subSectionId) {
    return next(new AppError("Please provide complete data!", 400));
  }
  const course = await courseModel.findById(req.body.courseId);
  const user = await userModel.findById(req.user.id);
  const subSection = await subSectionModel.findById(req.body.subSectionId);
  if (!course || !subSection || !user.courses.includes(req.body.courseId)) {
    return next(new AppError("Please provide correct data!", 400));
  }
  let courseProgess = await courseProgressModel.findOne({
    userId: req.user.id,
    courseId: req.body.courseId,
  });
  if (!courseProgess) {
    courseProgess = await courseProgressModel.create({
      userId: req.user.id,
      courseId: req.body.courseId,
      completedVideos: req.body.subSectionId,
    });
  } else if (!courseProgess.completedVideos.includes(req.body.subSectionId)) {
    courseProgess.completedVideos.push(req.body.subSectionId);
    await courseProgess.save();
  }
  return res.status(200).json(new Response("success", courseProgess));
});

exports.getCourseProgress = catchAsync(async (req, res, next) => {
  if (!req.params.courseId) {
    return next(new AppError("Please provide complete data!", 400));
  }
  const courseProgess = await courseProgressModel.findOne({
    userId: req.user.id,
    courseId: req.params.courseId,
  });
  if (!courseProgess) {
    //courseprogress does not exist
    return next(new AppError("Please provide correct data!", 400));
  }

  return res.status(200).json(new Response("success", courseProgess));
});
