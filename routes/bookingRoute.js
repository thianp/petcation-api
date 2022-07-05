const express = require("express");

const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/single/:bookingId", bookingController.getSingleBooking);
router.get("/guest", bookingController.getGuestBookings);
router.get("/host/:id", bookingController.getHostBookings);
router.patch("/update/:bookingId", bookingController.updateBookingStatus);

module.exports = router;
