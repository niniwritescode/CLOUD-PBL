const express = require("express");
const router = express.Router();
const db = require("../database/filedb");

// Get all services
router.get("/services", (req, res) => {
    try {
        const services = db.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Order new service
router.post("/service", (req, res) => {
    try {
        const { bookingId, foodItem, quantity } = req.body;
        
        if (!bookingId || !foodItem || !quantity) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const service = db.addService(bookingId, foodItem, quantity);
        res.json({ 
            success: true, 
            message: "Service ordered successfully",
            service
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;