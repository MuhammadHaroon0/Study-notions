const mongoose=require('mongoose')
var validator = require('validator');
const {sectionSchema} = require('./SectionModel');

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:4,
        maxLength:30
    },
    description:{
        type:String,
        required:[true,'description is required'],
    },
    ratings:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ratings'
    },
    instructor:{
        type:String,
        required:[true,'instructor is required'],
        minLength:4,
    },
    whatYouWillLearn:{
        type:String,
        required:[true,'whatYouWillLearn is required'],
    },
    courseContent:[sectionSchema],
    price:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tags'
    }
})

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

exports.courseModel=mongoose.model('courses',courseSchema)
exports.courseSchema=courseSchema