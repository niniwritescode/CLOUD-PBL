const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");

router.post("/book", async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.send("Room booked successfully");
});

router.get("/bookings", async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

module.exports = router;