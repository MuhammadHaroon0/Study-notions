const { sectionModel } = require("../models/sectionModel");
const { subSectionModel } = require("../models/subSectionModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.addsubSection = catchAsync(async (req, res, next) => {
  if (!req.body.sectionID) {
    return next(new AppError("Enter correct information!", 400));
  }
  const newsubSection = new subSectionModel({
    title: req.body.title,
    duration: req.body.duration,
    description: req.body.description,
    videoUrl: req.body.videoUrl || "abc.com",
  });
  const found = await sectionModel.findByIdAndUpdate(
    req.body.sectionID,
    {
      $push: {
        subSection: newsubSection._id,
      },
    },
    {
      new: true,
    }
  );
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  newsubSection.save();
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});

exports.deletesubSection = catchAsync(async (req, res, next) => {
  const found = await sectionModel.findByIdAndUpdate(req.body.sectionID, {
    $pull: {
      subSection: req.params.id,
    },
  });
  if (!found) {
    return next(new AppError("Section not found matching this id!", 404));
  }
  const doc = await subSectionModel.deleteOne({ _id: req.params.id });
  if (doc.deletedCount < 1) {
    return next(new AppError("Subsection not found matching this id!", 404));
  }
  // console.log(newSection._id);
  return res.status(204).json(new Response("success", found));
});
