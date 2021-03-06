const express = require("express");
const allHouseController = require("../controllers/allHouseController");

const router = express.Router();

router.get("/", allHouseController.getHouse);
router.get("/search", allHouseController.getHouseFilter);
router.get("/:id", allHouseController.getHouseById);

module.exports = router;
