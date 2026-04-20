const express = require("express");
const router = express.Router();
const db = require("../database/filedb");

// Get all bookings
router.get("/bookings", (req, res) => {
    try {
        const bookings = db.getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new booking
router.post("/book", (req, res) => {
    try {
        const { customerName, roomType, checkIn, checkOut, price } = req.body;
        
        if (!customerName || !roomType || !checkIn || !checkOut || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const booking = db.addBooking(customerName, roomType, checkIn, checkOut, price);
        res.json({ 
            success: true, 
            message: "Room booked successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;