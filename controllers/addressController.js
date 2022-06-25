const { Province, District, SubDistrict } = require("../models");

exports.getProvinces = async (req, res, next) => {
  try {
    let provinces = await Province.findAll();
    res.json({ provinces });
  } catch (err) {
    next(err);
  }
};

exports.getDistricts = async (req, res, next) => {
  try {
    let districts = await District.findAll({
      where: { provinceId: req.params.provinceId },
    });
    res.json({ districts });
  } catch (err) {
    next(err);
  }
};

exports.getSubDistricts = async (req, res, next) => {
  try {
    let subDistricts = await SubDistrict.findAll({
      where: { districtId: req.params.districtId },
    });
    res.json({ subDistricts });
  } catch (err) {
    next(err);
  }
};
