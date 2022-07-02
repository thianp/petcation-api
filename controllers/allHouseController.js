const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const { House, User, sequelize } = require('../models');
const createError = require('../utils/createError');

exports.getHouse = async (req, res, next) => {
  try {
    const houses = await House.findAll({ where: { status: 'OPEN' } });
    if (!houses) {
      createError('House not found', 400);
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
        { model: User, attributes: { exclude: ['uId', 'email', 'password'] } },
      ],
    });
    console.log(id);
    if (!house) {
      createError('House not found', 400);
    }

    res.status(200).json(house);
  } catch (err) {
    next(err);
  }
};

exports.getHouseFilter = async (req, res, next) => {
  try {
    const { checkInDate, checkOutDate, amountPet, province, petType } =
      req.body;

    const filter = await sequelize.query(
      'SELECT `limit`,SUM(amount) `totalPet`, house_id `houseId` , `date` FROM filterdates WHERE `date` BETWEEN "' +
        checkInDate +
        '" AND "' +
        checkOutDate +
        '"' +
        'GROUP BY `date`,house_id',
      {
        type: QueryTypes.SELECT,
      }
    );

    let activeHouse = filter.reduce((acc, el) => {
      if (!amountPet) {
        if (el.limit - el.totalPet === 0) {
          acc.push(el.houseId);
        }
      } else {
        if (el.limit - el.totalPet === +amountPet) {
          acc.push(el.houseId);
        }
      }

      return acc;
    }, []);

    const payload = {};

    if (!amountPet) {
      payload.id = {
        [Op.not]: activeHouse,
      };
    } else {
      payload.id = activeHouse;
    }

    if (petType) {
      payload.petType = petType;
    }

    if (province) {
      const userId = await User.findAll({
        where: { province },
        attributes: ['id'],
      });

      const setUserId = userId.reduce((acc, el) => {
        acc.push(el.id);
        return acc;
      }, []);
      payload.userId = setUserId;
    }

    const houses = await House.findAll({
      where: payload,
    });
    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};
