const { User } = require('../models');
const createError = require('../utils/createError.js');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      createError(404, 'User not found');
    }
    console.log(user);
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

// exports.updateProfileUser = async (req, res, next) => {
//   try {
//     const { firstName, lastName, phoneNumber, address, userId } = req.body;

//     let image;
//     if (req.file) {
//       const userprofile = await cloudinary.upload(req.file.path);
//       image = userprofile.secure_url;
//     }

//     const profileUser = await Product.findOne({
//       where: { id: userId },
//     });
//     userprofile.save();
//     res.status(201).json({ profileUser });
//   } catch (err) {
//     next(err);
//   }
// };

exports.updateProfile = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      provinces,
      districts,
      subDistricts,
      zipCodes,
      address,
    } = req.body;

    let userPic;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      userPic = result.secure_url;
    }
    const updateValue = {
      firstName,
      lastName,
      phoneNumber,

      province: provinces,
      district: districts,
      subDistrict: subDistricts,
      zipCode: zipCodes,
      address,
      userPic,
    };

    const user = await User.update(updateValue, { where: { id: req.user.id } });
    res.json(user);
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
