const omise = require("omise")({
  secretKey: "skey_test_5s9r39mkp5631hvcqa4",
  omiseVersion: "2019-05-29",
});
const {
  Booking,
  House,
  sequelize,
  Pet,
  Bookingpet,
  Bookinghouse,
  User,
  Host,
  Bookingcustomer,
} = require("../models");
const createError = require("../utils/createError.js");

exports.createBooking = async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
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

      // create charge (payment)
      let createdCharge;
      await omise.charges.create(
        {
          amount: +price * 100,
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

      // create booking
      const booking = await Booking.create(
        {
          checkInDate,
          checkOutDate,
          houseId,
          price,
          foodPrice,
          serviceFee,
          includeFood,
          status: createdCharge.status.toUpperCase(),
          paymentId: createdCharge.id,
          userId: id,
        },
        { transaction: t }
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
            { transaction: t }
          );
        } else {
          createError("Pet not found");
        }
      });

      // find house
      const house = await House.findOne({
        where: { id: houseId },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "size", "other"],
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
          exclude: ["id", "createdAt", "updatedAt", "password", "email"],
        },
      });
      if (host) {
        createdHost = await Host.create(
          {
            ...host.dataValues,
            bookingId: booking.id,
            userId: house.userId,
          },
          { transaction: t }
        );
      } else {
        createError("Host user not found");
      }

      // create customer
      const customer = await User.findOne({
        where: { id },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "password", "email"],
        },
      });
      if (customer) {
        await Bookingcustomer.create(
          {
            ...customer.dataValues,
            bookingId: booking.id,
            userId: id,
          },
          { transaction: t }
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
          hostId: createdHost.id,
        },
        { transaction: t }
      );

      res.json({ booking });
    });
  } catch (err) {
    next(err);
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
