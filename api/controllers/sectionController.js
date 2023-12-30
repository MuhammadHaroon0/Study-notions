const { courseModel } = require("../models/courseModel");
const { sectionModel } = require("../models/sectionModel");
const { subSectionModel } = require("../models/subSectionModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.addSection = catchAsync(async (req, res, next) => {
  if (!req.body.courseID) {
    return next(new AppError("Enter correct information!", 400));
  }
  const newSection = new sectionModel({ name: req.body.name });
  const found = await courseModel.findByIdAndUpdate(
    req.body.courseID,
    {
      $push: {
        courseContent: newSection._id,
      },
    },
    {
      new: true,
    }
  );

  if (!found) {  //course Not found  
    return next(new AppError("Document not found matching this id!", 404));
  }
  await newSection.save();
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});

exports.deleteSection = catchAsync(async (req, res, next) => {
  if (!req.body.courseID) {
    return next(new AppError("Enter correct information!", 400));
  }

  const found = await courseModel.findByIdAndUpdate(req.body.courseID, {
    $pull: {
      courseContent: req.params.id,
    },
  });
  //   console.log(found);
  if (!found) {
    return next(new AppError("No such section exists in the course!", 404));
  }
  const section = await sectionModel.findById(req.params.id);
  if (!section) {
    return next(new AppError("No section found!", 404));
  }
  await subSectionModel.deleteMany({ _id: { $in: section.subSection } });
  await sectionModel.findByIdAndDelete(req.params.id);
  return res.status(204).json(new Response("success", found));
});
