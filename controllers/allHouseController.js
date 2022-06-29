const { House, User } = require("../models");
const createError = require("../utils/createError");

exports.getHouse = async (req, res, next) => {
  try {
    const houses = await House.findAll({ where: { status: "OPEN" } });
    if (!houses) {
      createError("House not found", 400);
    }

    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};

exports.getHouseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const house = await House.findOne({
      where: { id },
      include: [
        { model: User, attributes: { exclude: ["uId", "email", "password"] } },
      ],
    });
    console.log(id);
    if (!house) {
      createError("House not found", 400);
    }

    res.status(200).json(house);
  } catch (err) {
    next(err);
  }
};
