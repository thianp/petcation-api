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
    const d = new Date();
    const dOut = new Date();
    let { checkInDate, checkOutDate, amountPet, province, petType } = req.query;

    if (amountPet === "" || !amountPet) {
      checkOutDate = 1;
    }
    if (petType === "" || !petType) {
      petType = ["CAT", "DOG"];
    }

    let deactiveHouse = [];

    console.log("checkInDate", checkInDate);
    console.log("checkOutDate", checkOutDate);
    console.log("province", province);

    if (checkInDate !== "" || checkOutDate !== "") {
      deactiveHouse = await Filterdate.findAll({
        where: {
          date: {
            [Op.between]: [checkInDate, checkOutDate],
          },
        },
      });
    } else {
      deactiveHouse = await Filterdate.findAll({
        where: {
          date: {
            [Op.between]: [
              d.toISOString(),
              new Date(dOut.setMonth(d.getMonth() + 4)).toISOString(),
            ],
          },
        },
      });
    }

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
      if (getTotal[k] < +amountPet) {
        fullHouse.push(k * 1);
      }
    }

    console.log(fullHouse);

    let userId;
    if (province !== "") {
      const user = await User.findAll({
        where: { province },
        attributes: ["id"],
      });

      const sum = JSON.parse(JSON.stringify(user));
      console.log(JSON.stringify(user));
      userId = sum.map((el) => el.id);
    }
    console.log(userId);

    const houses = await House.findAll({
      where: {
        id: {
          [Op.notIn]: [fullHouse],
        },
        petType: {
          [Op.or]: [petType],
        },
        limit: {
          [Op.gte]: amountPet,
        },
        userId: {
          [Op.in]: userId,
        },
      },
    });

    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};
