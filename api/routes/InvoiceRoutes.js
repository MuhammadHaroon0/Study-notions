const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");
const invoiceModel = require('./../models/InvoiceModel');

router.route("/").get(getAll(invoiceModel)).post(createOne(invoiceModel));
router
  .route("/:id")
  .get(getOne(invoiceModel))
  .put(updateOne(invoiceModel))
  .delete(deleteOne(invoiceModel));
module.exports = router;
