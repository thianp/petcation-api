const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

router.get("/provinces", addressController.getProvinces);
router.get("/districts/:provinceId", addressController.getDistricts);
router.get("/subdistricts/:districtId", addressController.getSubDistricts);

module.exports = router;
