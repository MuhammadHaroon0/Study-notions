const express = require("express");
const router = express.Router();
const { getAll, getOne, updateOne } = require("../controllers/handlerFactory");

const { subSectionModel } = require("./../models/subSectionModel");

const {
  addsubSection,
  deletesubSection,
} = require("../controllers/subSectionController");

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(subSectionModel))
  .post(protect, restriction("instructor", "admin"), addsubSection);
  
router
  .route("/:id")
  .get(getOne(subSectionModel))
  .put(protect, restriction("instructor", "admin"), updateOne(subSectionModel))
  .delete(protect, restriction("instructor", "admin"), deletesubSection);

module.exports = router;
