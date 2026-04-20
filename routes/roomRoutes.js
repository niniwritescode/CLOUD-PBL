const express = require("express");
const router = express.Router();
const db = require("../database/filedb");

// Get all rooms
router.get("/rooms", (req, res) => {
    try {
        const rooms = db.getAllRooms();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new room
router.post("/rooms", (req, res) => {
    try {
        const { type, price, available } = req.body;
        
        if (!type || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const room = db.addRoom(type, price, available !== false);
        res.json({ 
            success: true, 
            message: "Room added successfully",
            room
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
