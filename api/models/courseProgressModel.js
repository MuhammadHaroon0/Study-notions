const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "course id is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      unique: true,
    },
  ],
});

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// userSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// tourSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// userSchema.virtual('',{
//
// })

exports.courseProgressModel = mongoose.model(
  "CourseProgress",
  courseProgressSchema
);
