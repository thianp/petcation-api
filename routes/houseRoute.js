const express = require("express");
const upload = require("../middlewares/upload");

const houseController = require("../controllers/houseController");

const router = express.Router();

router.get("/user", houseController.getHouseByUserId);
router.get("/limitHouse/:id", houseController.getHouseLimit);
router.post(
  "/create",
  upload.fields([{ name: "cover", maxCount: 7 }]),
  houseController.createHouse
);
router.patch("/update", houseController.updateHouse);
router.delete("/", houseController.deleteHouse);

module.exports = router;
