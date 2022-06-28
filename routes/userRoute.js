const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/upload");

router.get("/", userController.getUser);

router.patch("/update", upload.single("image"), userController.updateProfile);

module.exports = router;
