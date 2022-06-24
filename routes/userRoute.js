const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);

router.get("/", userController.getUserById);

module.exports = router;
