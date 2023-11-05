const express=require('express')
const router=express.Router()
const {getAll,createOne, getOne, updateOne, deleteOne}=require('../controllers/handlerFactory')
const userModel=require('../models/UserModel')

router.route('/').get(getAll(userModel)).post(createOne(userModel));
router.route('/:id').get(getOne(userModel)).put(updateOne(userModel)).delete(deleteOne(userModel));
module.exports=router

