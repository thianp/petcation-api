const express = require("express");
const petController = require("../controllers/petController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/:id", petController.getPetById);
router.get("/", petController.getAllPet);
router.post("/", upload.single("petPic"), petController.createPet);
router.patch(
  "/update/:petId",
  upload.single("petPic"),
  petController.updatePet
);

router.delete("/:petId", petController.deletePet);

module.exports = router;
