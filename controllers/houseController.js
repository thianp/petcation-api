const { Province, District, SubDistrict } = require("../models");

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
