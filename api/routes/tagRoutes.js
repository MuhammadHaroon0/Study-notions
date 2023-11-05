const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");
const tagModel = require('./../models/TagModel');

router.route("/").get(getAll(tagModel)).post(createOne(tagModel));
router
  .route("/:id")
  .get(getOne(tagModel))
  .put(updateOne(tagModel))
  .delete(deleteOne(tagModel));
module.exports = router;
