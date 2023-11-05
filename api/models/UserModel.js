const mongoose=require('mongoose')
var validator = require('validator');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:4,
        maxLength:30
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        minLength:7,
        maxLength:50,
        validate:[validator.isEmail,'Email should be valid']
    },
    contact:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:7,
        select:false,
        validate: {
            validator: function (value) {
              // Regular expression to match at least one letter, one number, and one special character
              const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
              return regex.test(value);
            },
            message:
              'Password must contain at least one letter, one number, and one special character.',
          },
    },
    confirmPassword:{
        type:String,
        required:[true,'password is required'],
        select:false,
        validate: {
            validator: function (val) {
              return this.password === val;
            },
            message: "Passwords are not same",
          },
    },
    accountType:{
      type:String,
      enum:['student','instructor','admin'],
      default:'student'
    },
    active:{
      type:Boolean,
      default:true,
    },
    approve:{
      type:Boolean,
      default:true,
    },
    courses:[{type:mongoose.Schema.Types.ObjectId,ref:'courses'}
  ]
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

module.exports=mongoose.model('users',userSchema)