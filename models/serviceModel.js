const mongoose = require("../database/db");

const serviceSchema = new mongoose.Schema({
    bookingId: String,
    foodItem: String,
    quantity: Number
});

module.exports = mongoose.model("Service", serviceSchema);