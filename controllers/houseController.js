const { Province, District, SubDistrict, House } = require('../models');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.getHouse = async (req, res, next) => {
  try {
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
exports.getHouseByUserId = async (req, res, next) => {
  try {
    const { test } = req.body;
    res.status(200).json({ test });
  } catch (err) {
    next(err);
  }
};

exports.createHouse = async (req, res, next) => {
  try {
    const {
      name,
      type,
      petType,
      price,
      foodPrice,
      size,
      limit,
      checkInTime,
      checkOutTime,
      petFood,
      dailySchedule,
      other,
      isPetFood,
      isGrooming,
      isAirCondition,
      isPetStaff,
      isPetTraining,
      isPickupDropOff,
      isLitterChangedDaily,
      isAirFilter,
    } = req.body;

    let allPic;

    if (req.files.cover) {
      const coverRes = await cloudinary.upload(req.files.cover[0].path);
      const res1 = await cloudinary.upload(req.files.cover[1].path);
      const res2 = await cloudinary.upload(req.files.cover[2].path);
      const res3 = await cloudinary.upload(req.files.cover[3].path);
      const res4 = await cloudinary.upload(req.files.cover[4].path);
      const res5 = await cloudinary.upload(req.files.cover[5].path);
      const res6 = await cloudinary.upload(req.files.cover[6].path);

      allPic = `[
        ${coverRes.secure_url},
        ${res1.secure_url},
        ${res2.secure_url},
        ${res3.secure_url},
        ${res4.secure_url},
        ${res5.secure_url},
        ${res6.secure_url},
      ]`;
    }

    const house = await House.create({
      userId: req.user.id,
      name,
      type,
      petType,
      price,
      foodPrice,
      size,
      limit,
      checkInTime,
      checkOutTime,
      petFood,
      dailySchedule,
      image: allPic,
      other,
      isPetFood,
      isGrooming,
      isAirCondition,
      isPetStaff,
      isPetTraining,
      isPickupDropOff,
      isLitterChangedDaily,
      isAirFilter,
    });
    res.status(201).json({ house });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.cover) {
      fs.unlinkSync(req.files.cover[0].path);
      fs.unlinkSync(req.files.cover[1].path);
      fs.unlinkSync(req.files.cover[2].path);
      fs.unlinkSync(req.files.cover[3].path);
      fs.unlinkSync(req.files.cover[4].path);
      fs.unlinkSync(req.files.cover[5].path);
      fs.unlinkSync(req.files.cover[6].path);
    }
  }
};

exports.updateHouse = async (req, res, next) => {
  try {
    const { test } = req.body;
    res.status(200).json({ test });
  } catch (err) {
    next(err);
  }
};
exports.deleteHouse = async (req, res, next) => {
  try {
    const { test } = req.body;
    res.status(200).json({ test });
  } catch (err) {
    next(err);
  }
};
