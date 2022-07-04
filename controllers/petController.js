const { Pet } = require("../models");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const createError = require("../utils/createError");

//Create Pet
exports.createPet = async (req, res, next) => {
  try {
    const { name, type, weight, age, species, note } = req.body;

    console.log(age);

    let petPic;

    if (req.file) {
      const pet = await cloudinary.upload(req.file.path);

      petPic = pet.secure_url;
    }

    const pets = await Pet.create({
      userId: req.user.id,
      name,
      type,
      petPic,
      weight,
      age,
      species,
      note,
    });

    res.status(201).json({ pets });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//Get pet
exports.getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findOne({
      where: {
        id,
      },
    });
    if (!pet) {
      createError(404, "User not found");
    }
    console.log(pet);
    res.status(200).json({ pet });
  } catch (err) {
    next(err);
  }
};
exports.getAllPet = async (req, res, next) => {
  try {
    const pet = await Pet.findAll();

    res.status(200).json({ pet });
  } catch (err) {
    next(err);
  }
};

//Update Pet
exports.updatePet = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const { name, type, weight, age, species, note } = req.body;

    let petPic;
    if (req.file) {
      const pet = await cloudinary.upload(req.file.path);

      petPic = pet.secure_url;
    }
    console.log({ name, type, petPic, weight, age, species, note, petPic });

    const updatepets = {
      name,
      type,
      petPic,
      weight,
      age,
      species,
      note,
      petPic,
    };

    const pets = await Pet.update(updatepets, { where: { id: petId } });

    res.status(201).json({ updatepets });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

//Delete Pet
exports.deletePet = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const pet = await Pet.destroy({ where: { id: petId } });

    if (!pet) {
      createError("pet not found", 400);
    }

    res.json({ message: "delete pet accepted" });
  } catch (err) {
    next(err);
  }
};
