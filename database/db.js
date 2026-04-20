const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hotelDB";

// Set connection options
const connectionOptions = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
};

mongoose.connect(mongoURI, connectionOptions).catch(err => {
    console.error("⚠️  MongoDB connection failed (will use in-memory storage):", err.message);
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("⚠️  MongoDB connection error:", err.message);
});

db.once("open", () => {
    console.log("✓ MongoDB connected successfully!");
});

db.on("disconnected", () => {
    console.log("⚠️  MongoDB disconnected");
});

module.exports = mongoose;