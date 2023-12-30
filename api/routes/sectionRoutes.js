const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
} = require("../controllers/handlerFactory");

const {sectionModel} = require('./../models/sectionModel');

const { addSection,deleteSection } = require("../controllers/sectionController");

const { protect, restriction } = require("../controllers/authController");

router.route("/").get(getAll(sectionModel)).post(protect,restriction("instructor","admin"),addSection);

router
  .route("/:id")
  .get(getOne(sectionModel,'subSection'))
  .put(protect,restriction("instructor","admin"),updateOne(sectionModel))
  .delete(protect,restriction("instructor","admin"),deleteSection);
  
module.exports = router;
