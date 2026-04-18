const mongoose = require("../database/db");

const bookingSchema = new mongoose.Schema({
    customerName: String,
    roomType: String,
    checkIn: String,
    checkOut: String,
    price: Number
});

module.exports = mongoose.model("Booking", bookingSchema);