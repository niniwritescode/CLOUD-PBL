const express = require("express");
const cors = require("cors");
const path = require("path");

// Import file-based database
const db = require("./database/filedb");

// Import routes
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/", bookingRoutes);
app.use("/", serviceRoutes);
app.use("/", roomRoutes);

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "Cloud Hotel Server Running", 
        port: 5000,
        timestamp: new Date(),
        environment: process.env.NODE_ENV || "development",
        database: "File-Based (JSON)",
        dataDirectory: path.join(__dirname, "data")
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✓ Cloud Hotel Server running on http://localhost:${PORT}`);
    console.log(`✓ Frontend available at http://localhost:${PORT}`);
    console.log(`✓ API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`✓ Database: File-Based (JSON - No Dependencies!)`);
    console.log(`✓ Data stored in: ${path.join(__dirname, "data")}`);
    console.log(`${'═'.repeat(50)}\n`);
});