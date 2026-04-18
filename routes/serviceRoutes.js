const express = require("express");
const router = express.Router();
const Service = require("../models/serviceModel");

router.post("/service", async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.send("Service ordered successfully");
});

router.get("/services", async (req, res) => {
    const services = await Service.find();
    res.json(services);
});

module.exports = router;