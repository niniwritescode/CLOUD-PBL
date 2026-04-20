const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '..', 'hotel.db');

// Create/open database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database connection error:', err);
    } else {
        console.log('✓ SQLite database connected at:', dbPath);
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    // Create rooms table
    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT UNIQUE NOT NULL,
            price INTEGER NOT NULL,
            available BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerName TEXT NOT NULL,
            roomType TEXT NOT NULL,
            checkIn TEXT NOT NULL,
            checkOut TEXT NOT NULL,
            price INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create services table
    db.run(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bookingId TEXT NOT NULL,
            foodItem TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Seed sample rooms if not exists
    db.get('SELECT COUNT(*) as count FROM rooms', (err, row) => {
        if (err) {
            console.error('Error checking rooms:', err);
        } else if (row.count === 0) {
            db.run("INSERT INTO rooms (type, price, available) VALUES (?, ?, ?)", ['Single', 1000, 1]);
            db.run("INSERT INTO rooms (type, price, available) VALUES (?, ?, ?)", ['Double', 1800, 1]);
            db.run("INSERT INTO rooms (type, price, available) VALUES (?, ?, ?)", ['Deluxe', 3000, 1]);
            console.log('✓ Sample rooms added to database');
        }
    });
}

module.exports = db;
