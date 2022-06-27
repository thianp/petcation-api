const { User } = require("../models");
const createError = require("../utils/createError.js");
const cloudinary = require("../utils/cloudinary");

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      createError(404, "User not found");
    }
    console.log(user);
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.createProfileUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      province,
      district,
      subDistrict,
      zipCode,
      address,
    } = req.body;

    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }

    const profileUser = await Product.findOne({
      firstName,
      lastName,
      phoneNumber,
      province,
      district,
      subDistrict,
      zipCode,
      address,
      image,
    });

    res.status(201).json({ profileUser });
  } catch (err) {
    next(err);
  }
};
