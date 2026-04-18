# CLOUD - Booking & Service Management System

A full-stack application for managing bookings and services with a modern web interface and robust backend.

## 📋 Project Structure

```
Cloud/
├── app.py                 # Python application
├── server.js             # Node.js/Express server
├── package.json          # Node.js dependencies
├── database/
│   └── db.js            # Database configuration
├── models/
│   ├── bookingModel.js  # Booking data model
│   └── serviceModel.js  # Service data model
└── routes/
    ├── bookingRoutes.js # Booking endpoints
    └── serviceRoutes.js # Service endpoints
```

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** [Database configured in db.js]
- **Python:** app.py for additional processing
- **API:** RESTful endpoints for bookings and services

## ✨ Features

- **Booking Management:** Create, read, update, and manage bookings
- **Service Management:** Manage available services
- **Database Integration:** Persistent data storage
- **RESTful API:** Clean API endpoints for frontend integration

## 📦 Installation

### Prerequisites
- Node.js and npm
- Python 3.x
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/niniwritescode/CLOUD-PBL.git
   cd Cloud
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Set up database**
   - Configure your database connection in `database/db.js`

## 🚀 Running the Application

### Start the Node.js server
```bash
node server.js
```

### Run Python app (if needed)
```bash
python app.py
```

The server will start on the configured port (typically 3000).

## 📡 API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create a new service
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is part of a PBL (Project Based Learning) initiative.

---

Made with ❤️ by the CLOUD team
