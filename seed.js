// Database seeding script - run this to initialize sample data
const mongoose = require("./database/db");
const Room = require("./models/roomModel");
const Booking = require("./models/bookingModel");
const Service = require("./models/serviceModel");

async function seedDatabase() {
    try {
        console.log("🌱 Seeding database...");

        // Clear existing data
        await Room.deleteMany({});
        console.log("✓ Cleared existing rooms");

        // Create sample rooms
        const rooms = [
            { roomType: "Single", price: 1000, available: true },
            { roomType: "Double", price: 1800, available: true },
            { roomType: "Deluxe", price: 3000, available: true }
        ];

        await Room.insertMany(rooms);
        console.log("✓ Sample rooms created");

        console.log("✅ Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

// Run seeding
seedDatabase();
