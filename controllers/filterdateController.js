const { Filterdate, House, sequelize } = require("../models");

exports.getBookingAmount = async (req, res, next) => {
  try {
    const { houseId, startDate, endDate } = req.params;

    function addDays(day) {
      let date = new Date(day);
      date.setDate(date.getDate() + 1);
      return date;
    }

    let dateArr = [];
    let curDate = new Date(startDate);
    let stopDate = new Date(endDate);
    while (curDate <= stopDate) {
      const date = curDate.toISOString();
      dateArr.push(date.slice(0, 10));
      curDate = addDays(curDate);
    }

    // find all filter dates within date range
    let filterdates = [];
    await Promise.all(
      dateArr.map(async (el) => {
        const foundFilterdates = await Filterdate.findAll({
          where: { date: el, houseId },
        });
        if (foundFilterdates) {
          filterdates.push(...foundFilterdates);
        }
      })
    );

    // find house limit
    const { limit } = await House.findOne({ where: { id: houseId } });

    // find total amount for each day
    let totalAmounts = [];
    dateArr.map((el) => {
      let amount = 0;
      filterdates.filter((fd) => {
        if (el === fd.date) {
          amount += fd.amount;
        }
      });
      totalAmounts.push(amount);
    });

    // get biggest amount
    const max = Math.max(...totalAmounts);
    console.log(max);

    res.status(200).json({ max });
  } catch (err) {
    next(err);
  }
};
