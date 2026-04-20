const fs = require('fs');
const path = require('path');

// Database file path
const dbDir = path.join(__dirname, '..', 'data');
const bookingsFile = path.join(dbDir, 'bookings.json');
const servicesFile = path.join(dbDir, 'services.json');
const roomsFile = path.join(dbDir, 'rooms.json');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✓ Created data directory');
}

// Initialize database with sample data
function initializeDatabase() {
    // Initialize rooms
    if (!fs.existsSync(roomsFile)) {
        const rooms = [
            { id: 1, type: "Single", price: 1000, available: true },
            { id: 2, type: "Double", price: 1800, available: true },
            { id: 3, type: "Deluxe", price: 3000, available: true }
        ];
        fs.writeFileSync(roomsFile, JSON.stringify(rooms, null, 2));
        console.log('✓ Rooms database initialized');
    }

    // Initialize bookings
    if (!fs.existsSync(bookingsFile)) {
        fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
    }

    // Initialize services
    if (!fs.existsSync(servicesFile)) {
        fs.writeFileSync(servicesFile, JSON.stringify([], null, 2));
    }
}

// Utility functions
const db = {
    // Rooms
    getAllRooms: () => {
        try {
            const data = fs.readFileSync(roomsFile, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading rooms:', err);
            return [];
        }
    },

    addRoom: (type, price, available = true) => {
        try {
            const rooms = db.getAllRooms();
            const id = Math.max(...rooms.map(r => r.id), 0) + 1;
            rooms.push({ id, type, price, available });
            fs.writeFileSync(roomsFile, JSON.stringify(rooms, null, 2));
            return { id, type, price, available };
        } catch (err) {
            console.error('Error adding room:', err);
            throw err;
        }
    },

    // Bookings
    getAllBookings: () => {
        try {
            const data = fs.readFileSync(bookingsFile, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading bookings:', err);
            return [];
        }
    },

    addBooking: (customerName, roomType, checkIn, checkOut, price) => {
        try {
            const bookings = db.getAllBookings();
            const id = bookings.length + 1;
            const booking = { id, customerName, roomType, checkIn, checkOut, price, created_at: new Date() };
            bookings.push(booking);
            fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
            return booking;
        } catch (err) {
            console.error('Error adding booking:', err);
            throw err;
        }
    },

    // Services
    getAllServices: () => {
        try {
            const data = fs.readFileSync(servicesFile, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading services:', err);
            return [];
        }
    },

    addService: (bookingId, foodItem, quantity) => {
        try {
            const services = db.getAllServices();
            const id = services.length + 1;
            const service = { id, bookingId, foodItem, quantity, created_at: new Date() };
            services.push(service);
            fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2));
            return service;
        } catch (err) {
            console.error('Error adding service:', err);
            throw err;
        }
    }
};

// Initialize on startup
initializeDatabase();

console.log('✓ File-based database initialized at:', dbDir);

module.exports = db;
