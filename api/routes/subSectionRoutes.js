const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");
const subSectionModel = require('./../models/SubSectionModel');

router.route("/").get(getAll(subSectionModel)).post(createOne(subSectionModel));
router
  .route("/:id")
  .get(getOne(subSectionModel))
  .put(updateOne(subSectionModel))
  .delete(deleteOne(subSectionModel));
module.exports = router;
