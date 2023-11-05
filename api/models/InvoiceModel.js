const mongoose=require('mongoose')
var validator = require('validator');

const invoiceSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:[true,'courseName is required'],
        minLength:4,
        maxLength:30
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user is required'],
        ref:'users'
    },

    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'courseID is required'],
        ref:'courses'
    },
    price:{
        type:String,
        required:[true,'price is required'],
    },
    address:{
        type:String,
        required:[true,'address is required'],
    },
    pinCode:{
        type:String,
    }
})

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending


//Document middlewares,can work before or after save or create
// Pre Save Hook
invoiceSchema.pre('save',function(next){
    //query middleware
    console.log("as");
    next()
})

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

module.exports=mongoose.model('invoices',invoiceSchema)