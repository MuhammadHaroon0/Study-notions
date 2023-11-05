const Users=require('../models/userModel')
const catchAsync=require('./../utils/catchAsync')
const AppError=require('./../utils/AppError')

exports.getAllUsers=catchAsync(async(req,res,next)=>{
    const result=await Users.find();
    // if(result.length===0)
    // return next(new AppError("Not found",404))
    return res.status(200).json({
        totalResults:result.length,
        data:{
            data:result
        }
    })
})
