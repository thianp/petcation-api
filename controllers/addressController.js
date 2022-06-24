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
    let district = await District.findAll({
      where: { districtId: req.params.provinceId },
    });
    res.json({ district });
  } catch (err) {
    next(err);
  }
};

exports.getSubDistricts = async (req, res, next) => {
  try {
    let subDistricts = await SubDistrict.findAll({
      where: { subDistrictId: req.params.districtId },
    });
    res.json({ subDistricts });
  } catch (err) {
    next(err);
  }
};
