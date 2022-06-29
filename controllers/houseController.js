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
    // const { id } = req.params;
    const {
      id,
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
      status,
    } = req.body;

    console.log(req.body);

    const findHouseId = await House.findOne({ where: { id } });
    console.log(findHouseId);

    if (!findHouseId) {
      createError(404, "House not found");
    }

    const updateValue = await House.update(
      {
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
        status,
      },
      { where: { id: findHouseId.id } }
    );

    res.status(200).json({});
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
