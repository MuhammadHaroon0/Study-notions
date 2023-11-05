const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");
const ratingModel = require('./../models/RatingModel');

router.route("/").get(getAll(ratingModel)).post(createOne(ratingModel));
router
  .route("/:id")
  .get(getOne(ratingModel))
  .put(updateOne(ratingModel))
  .delete(deleteOne(ratingModel));
module.exports = router;
