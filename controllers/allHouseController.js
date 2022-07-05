const { QueryTypes, where } = require("sequelize");
const { Op } = require("sequelize");
const { House, User, sequelize, Filterdate } = require("../models");
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

exports.getHouseFilter = async (req, res, next) => {
  try {
    const {
      checkInDate,
      checkOutDate,
      amountPet = 1,
      province,
      petType,
    } = req.query;

    // const filter = await sequelize.query(
    // "SELECT * FROM filterdates",

    //   "SELECT `limit`,SUM(amount) `totalPet`, house_id `houseId` , `date` FROM filterdates WHERE `date` BETWEEN " +
    //     checkInDate +
    //     " AND " +
    //     checkOutDate +
    //     " GROUP BY `date`,house_id,`limit` ",
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );

    // let activeHouse = filter.reduce((acc, el) => {
    //   if (!amountPet) {
    //     if (el.limit - el.totalPet === 0) {
    //       acc.push(el.houseId);
    //     }
    //   } else {
    //     if (el.limit - el.totalPet < +amountPet) {
    //       acc.push(el.houseId);
    //     }
    //   }

    if (!checkInDate || !checkOutDate) {
      createError("Please complete check-in and check-out date", 400);
    }

    let deactiveHouse = [];

    if (checkInDate || checkOutDate) {
      deactiveHouse = await Filterdate.findAll({
        where: {
          date: {
            [Op.between]: [checkInDate, checkOutDate],
          },
        },
      });
    }
    console.log(deactiveHouse);

    const getTotal = deactiveHouse.reduce((a, c) => {
      if (!a[c.houseId]) {
        a[c.houseId] = c.limit - c.amount;
      } else {
        a[c.houseId] -= c.amount;
      }
      return a;
    }, {});
    console.log(getTotal);

    let fullHouse = [];
    for (let k in getTotal) {
      if (getTotal[k] === 0) {
        fullHouse.push(k * 1);
      }
    }

    const payload = {};

    // payload.id = {
    //   [Op.not]: fullHouse,
    // };

    if (petType) {
      payload.petType = petType;
    }

    // const housrId =
    // if (province) {
    //   const userId = await User.findAll({
    //     where: { province },
    //     // attributes: ["id"],
    //     attributes: ["houseId"],
    //   });

    //   const setUserId = userId.reduce((acc, el) => {
    //     acc.push(el.id);
    //     return acc;
    //   }, []);
    //   payload.userId = setUserId;
    // }

    // const houses = await House.findAll({
    //   where: payload,
    // });

    // province in user => user => house_id(16)
    const houses = await House.findAll({
      where: {
        id: {
          [Op.notIn]: [fullHouse],
        },
        petType,
      },
    });

    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};
