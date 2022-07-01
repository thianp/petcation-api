const express = require("express");
const upload = require("../middlewares/upload");

const filterdateController = require("../controllers/filterdateController");

const router = express.Router();

router.get("/:houseId/:startDate/:endDate", filterdateController.getBookingAmount);

module.exports = router;
