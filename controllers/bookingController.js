const omise = require("omise")({
  secretKey: "skey_test_5s9r39mkp5631hvcqa4",
  omiseVersion: "2019-05-29",
});
const { Booking, House } = require("../models");
const createError = require("../utils/createError.js");

exports.createBooking = async (req, res, next) => {
  try {
    // const { id } = req.user;
    // const {
    //   checkInDate,
    //   checkOutDate,
    //   houseId,
    //   price,
    //   foodPrice,
    //   serviceFee,
    //   includeFood,
    //   status,
    //   paymentId,
    // } = req.body;

    const { token } = req.body;
    omise.charges.create(
      {
        amount: 100000,
        currency: "thb",
        card: token,
      },
      function (err, charge) {
        /* Response. */
        if (err) {
          next(err);
        }
        console.log(charge);
      }
    );
  } catch (err) {
    next(err);
  }
};
