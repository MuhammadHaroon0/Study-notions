const mongoose=require('mongoose')

const subSectionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required'],
        minLength:4,
        maxLength:30
    },
    duration:{
        type:Number, // in minutes
        required:[true,'duration is required'],
    },
    description:{
        type:String,
        required:[true,'description is required'],
    },
    videoUrl:{
        type:String,
    },
    
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
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

subSectionSchema.virtual('durationInHours').get(function(){
    return (this.duration/60).toFixed(1);
})

exports.subSectionModel=mongoose.model('SubSection',subSectionSchema)