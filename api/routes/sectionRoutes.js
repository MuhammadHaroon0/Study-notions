const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");
const {sectionModel} = require('./../models/SectionModel');

router.route("/").get(getAll(sectionModel)).post(createOne(sectionModel));
router
  .route("/:id")
  .get(getOne(sectionModel))
  .put(updateOne(sectionModel))
  .delete(deleteOne(sectionModel));
module.exports = router;
