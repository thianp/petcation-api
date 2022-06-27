const { House, District, SubDistrict } = require("../models");
const createError = require("../utils/createError");

exports.getHouseByUserId = async (req, res, next) => {
  try {
    const { id } = req.user;

    const myHouse = await House.findOne({ where: { userId: id } });

    if (!myHouse) {
      createError("My House not found", 400);
    }

    res.status(200).json(myHouse);
  } catch (err) {
    next(err);
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
