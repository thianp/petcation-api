const express = require("express");
const houseController = require("../controllers/houseController");

const router = express.Router();

router.get("/", houseController.getHouse);
router.get("/user", houseController.getHouseByUserId);
router.patch("/update", houseController.updateHouse);
router.delete("/", houseController.deleteHouse);

module.exports = router;
