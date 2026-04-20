const mongoose = require("../database/db");

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["Single", "Double", "Deluxe"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Room", roomSchema);
