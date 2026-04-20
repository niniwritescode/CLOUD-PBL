// Configuration file for the application
require("dotenv").config();

module.exports = {
    port: process.env.PORT || 5000,
    mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hotelDB",
    nodeEnv: process.env.NODE_ENV || "development",
    corsOrigin: process.env.CORS_ORIGIN || "*"
};
