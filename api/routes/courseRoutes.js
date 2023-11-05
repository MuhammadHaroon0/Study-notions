const express=require('express')
const router=express.Router()
const {getAll,createOne, getOne, updateOne, deleteOne}=require('../controllers/handlerFactory')
const {courseModel}=require('../models/CourseModel')

router.route('/').get(getAll(courseModel)).post(createOne(courseModel));
router.route('/:id').get(getOne(courseModel)).put(updateOne(courseModel)).delete(deleteOne(courseModel));
module.exports=router

