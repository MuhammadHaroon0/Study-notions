const { courseModel } = require("../models/courseModel");
const { sectionModel } = require("../models/sectionModel");
const { ratingModel } = require("../models/ratingModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");
const { subSectionModel } = require("../models/subSectionModel");
const { courseProgressModel } = require("../models/courseProgressModel");
const userModel = require("../models/userModel");

exports.getAllCourseData = catchAsync(async (req, res, next) => {
  const found = await courseModel
    .findById(req.params.id)
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .populate("ratings");
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(200).json(new Response("success", found));
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  const found = await courseModel.findById(courseId);
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  
  for (const sectionId of found.courseContent) {
    const section = await sectionModel.findById(sectionId);
    if (section) {
      const subSection = section.subSection;
      for (const subSectionId of subSection) {
        await subSectionModel.findByIdAndDelete(subSectionId);
      }
      await sectionModel.findByIdAndDelete(sectionId);
    }
  }
  await courseProgressModel.deleteMany({ courseId: courseId });
  await courseModel.findByIdAndDelete(courseId);
  await userModel.updateMany({}, { $pull: { courses: courseId } });
  await ratingModel.deleteMany({ course: courseId });
  
  return res.status(204).json(new Response("success", found));
});

exports.getTop10Courses = catchAsync(async (req, res, next) => {
  //ratings is virtual array in courses and it contains objects which have rating atribute

  const top = await courseModel.aggregate([
    {
      $lookup: {
        from: "ratings", // Assuming the ratings collection name
        localField: "_id",
        foreignField: "course",
        as: "ratings",
      },
    },
    {
      $unwind: "$ratings",
    },
    {
      $group: {
        _id: "$_id",
        averageRating: {
          $avg: "$ratings.rating",
        },
        course: { $first: "$$ROOT" },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    { $limit: 10 },
    {
      $replaceRoot: { newRoot: "$course" },
    },
  ]);
  if (!top) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(200).json(new Response("success", top));
});

exports.getCoursesbytag = catchAsync(async (req, res, next) => {
  const found = await courseModel.find({ tags: { $in: req.params.tagName } });
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(200).json(new Response("success", found));
});
