const omise = require("omise")({
  secretKey: "skey_test_5s9r39mkp5631hvcqa4",
  omiseVersion: "2019-05-29",
});
const {
  Booking,
  House,
  // sequelize,
  Pet,
  Bookingpet,
  Bookinghouse,
  User,
  Host,
  Bookingcustomer,
  Filterdate,
} = require("../models");
const createError = require("../utils/createError.js");

exports.createBooking = async (req, res, next) => {
  let createdCharge;
  const { id } = req.user;
  const {
    token,
    checkInDate,
    checkOutDate,
    houseId,
    price,
    includeFood,
    serviceFee,
    foodPrice,
    petIds,
  } = req.body;

  try {
    let booking;
    let house;
    // await sequelize.transaction(async (t) => {
    // create booking
    booking = await Booking.create(
      {
        checkInDate,
        checkOutDate,
        houseId,
        price,
        foodPrice,
        serviceFee,
        includeFood,
        userId: id,
      },
      // { transaction: t }
    );

    // create bookingpets
    petIds.map(async (petId) => {
      const pet = await Pet.findOne({
        where: { id: petId },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      });
      if (pet) {
        await Bookingpet.create(
          { ...pet.dataValues, bookingId: booking.id },
          // { transaction: t }
        );
      } else {
        createError("Pet not found");
      }
    });

    // find house
    house = await House.findOne({
      where: { id: houseId },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    });
    if (!house) {
      createError("House not found");
    }

    // variable for receiving createdHost's id
    let createdHost;
    // create host
    const host = await User.findOne({
      where: { id: house.userId },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "password"],
      },
    });
    if (host) {
      createdHost = await Host.create(
        {
          ...host,
          bookingId: booking.id,
          userId: house.userId,
        },
        // { transaction: t }
      );
    } else {
      createError("Host user not found");
    }

    // create customer
    const customer = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "password"],
      },
    });
    if (customer) {
      await Bookingcustomer.create(
        {
          ...customer.dataValues,
          bookingId: booking.id,
          userId: id,
        },
        // { transaction: t }
      );
    } else {
      createError("Customer user not found");
    }

    // create booking house
    await Bookinghouse.create(
      {
        ...house.dataValues,
        houseId,
        bookingId: booking.id,
        // hostId: createdHost.id,
        hostId: 1,
      },
      // { transaction: t }
    );
    // });

    // create charge (payment) and update booking
    await omise.charges.create(
      {
        amount: (+price * 100).toFixed(2),
        currency: "thb",
        card: token,
      },
      function (err, charge) {
        if (err) {
          next(err);
        }
        createdCharge = charge;
      }
    );

    // create filter dates
    function addDays(day) {
      let date = new Date(day);
      date.setDate(date.getDate() + 1);
      return date;
    }

    let dateArr = [];
    let curDate = new Date(checkInDate);
    let stopDate = new Date(checkOutDate);
    while (curDate <= stopDate) {
      const date = curDate.toISOString();
      dateArr.push(date.slice(0, 10));
      curDate = addDays(curDate);
    }

    dateArr.map(async (el) => {
      await Filterdate.create({
        date: el,
        houseId,
        amount: petIds.length,
        limit: house.limit,
        bookingId: booking.id,
      });
    });

    // status handling
    if (createdCharge.status === "successful" || createdCharge === "pending") {
      await Booking.update(
        {
          status: createdCharge.status.toUpperCase(),
          paymentId: createdCharge.id,
        },
        {
          where: { id: booking.id },
        }
      );
    } else {
      createError("omise error: " + createdCharge.status);
    }

    res.json({ booking });
  } catch (err) {
    if (createdCharge) {
      omise.charges.createRefund(
        createdCharge.id,
        { amount: +(+price * 100).toFixed(2) },
        function (error, refund) {
          if (error) {
            console.log("internal error: ", err);
            console.log("omise refund error: ", error);
            next(error);
          } else {
            console.log("omise refund success: ", refund);
            next(
              new Error(
                "There was an issue. The amount charged will be refunded to you."
              )
            );
          }
        }
      );
    }
  }
};

exports.getSingleBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({ where: { id: bookingId } });
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

exports.getGuestBookings = async (req, res, next) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.findAll({ where: { userId: id } });
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

exports.getHostBookings = async (req, res, next) => {
  try {
    const { id } = req.user;
    const hostHouse = await House.findOne({ where: { userId: id } });
    if (!hostHouse) {
      createError("host's house is not found");
    }
    const bookings = await Booking.findAll({
      where: { houseId: hostHouse.id },
    });
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { id } = req.user;

    const { status } = req.body;

    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (booking.userId !== id) {
      createError("you are unauthorized");
    }
    booking.status = status;
    booking.save();
    res.json({ updateValue: status });
  } catch (err) {
    next(err);
  }
};
