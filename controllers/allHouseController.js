const e = require('cors');
const { QueryTypes } = require('sequelize');
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
    // const date = ['2022-07-01 00:00:00', '2022-07-02 00:00:00'];
    // let filter;
    // date.map(async (el) => {
    //   console.log(el);
    //   filter = await sequelize.query(
    //     'SELECT `limit`,SUM(amount) `totalPet`, house_id , `date` FROM filterdates GROUP BY `date`,house_id HAVING `date` = ' +
    //       el,
    //     {
    //       type: QueryTypes.SELECT,
    //     }
    //   );
    // });
    // const filter = await sequelize.query(
    //   'SELECT `limit`,SUM(amount) `totalPet`, house_id , `date` FROM filterdates GROUP BY `date`,house_id',
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );
    // const houses = await House.findAll({ where: { id: filterHouses } });
    // res.status(200).json(filter);
  } catch (err) {
    next(err);
  }
};
