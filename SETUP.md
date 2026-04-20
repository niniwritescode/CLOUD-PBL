# 🚀 Cloud Hotel Reservation System - Setup Guide

## 📋 Project Overview

Cloud Hotel Reservation is a full-stack web application for managing hotel room bookings and services. It features a beautiful frontend interface, robust backend API, and MongoDB database.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Additional:** Python (app.py for future enhancements)

## 📁 Project Structure

```
Cloud/
├── public/                      # Frontend files
│   ├── index.html              # Main HTML page
│   ├── styles.css              # Styling
│   └── script.js               # Frontend logic
├── routes/                      # API Routes
│   ├── bookingRoutes.js        # Booking endpoints
│   ├── serviceRoutes.js        # Service endpoints
│   └── roomRoutes.js           # Room endpoints
├── models/                      # Database Models
│   ├── bookingModel.js         # Booking schema
│   ├── serviceModel.js         # Service schema
│   └── roomModel.js            # Room schema
├── database/
│   └── db.js                   # MongoDB connection
├── server.js                   # Main server file
├── seed.js                     # Database initialization
├── package.json                # Dependencies
├── .env                        # Environment variables
└── app.py                      # Python backend (future use)
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas)
- npm or yarn

### Step 1: Install Dependencies

```bash
cd Cloud
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - **Windows:** Run `mongod` in command prompt
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file: `MONGODB_URI=your_connection_string`

### Step 3: Initialize Database

Seed the database with sample rooms:

```bash
npm run seed
```

You should see:
```
🌱 Seeding database...
✓ Cleared existing rooms
✓ Sample rooms created
✅ Database seeding completed successfully!
```

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

You should see:
```
✓ Cloud Hotel Server running on http://localhost:5000
✓ Frontend available at http://localhost:5000
```

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:5000
```

## ✨ Features

### 🏨 Room Booking
- View available room types (Single, Double, Deluxe)
- See room prices
- Book rooms with customer name, dates, and room selection
- View all bookings in real-time

### 🍽️ Services Management
- Order services/food during stay
- Track ordered services
- Link services to specific bookings

### 📊 Management Dashboard
- View all active bookings
- View all ordered services
- Real-time data updates
- Responsive design for all devices

## 🔌 API Endpoints

### Rooms
- `GET /rooms` - Get all available rooms
- `POST /rooms` - Add a new room (admin)

### Bookings
- `GET /bookings` - Get all bookings
- `POST /book` - Create new booking

### Services
- `GET /services` - Get all services ordered
- `POST /service` - Order a new service

## 📊 Database Models

### Room Schema
```javascript
{
  roomType: String,      // "Single", "Double", "Deluxe"
  price: Number,
  available: Boolean,
  createdAt: Date
}
```

### Booking Schema
```javascript
{
  customerName: String,
  roomType: String,
  checkIn: String,
  checkOut: String,
  price: Number
}
```

### Service Schema
```javascript
{
  bookingId: String,
  foodItem: String,
  quantity: Number
}
```

## 🎨 Frontend Features

### Navigation
- **Home:** Welcome screen
- **Book Room:** Room selection and booking form
- **Services:** Order food/services
- **My Bookings:** View all confirmed bookings

### User Interface
- Beautiful gradient design
- Responsive layout (works on mobile, tablet, desktop)
- Real-time form validation
- Alert notifications
- Smooth animations

## 🔧 Environment Variables

`.env` file configuration:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hotelDB
NODE_ENV=development
```

## 📝 Sample Data

### Default Rooms (Added via seed.js)
1. **Single Room** - ₹1,000/night
2. **Double Room** - ₹1,800/night
3. **Deluxe Suite** - ₹3,000/night

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env file
```

### CORS Issues
- CORS is already enabled in server
- Make sure frontend is accessing http://localhost:5000

### Frontend Not Loading
- Check if static files are in `public/` folder
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors

## 📱 Mobile Responsive

The application is fully responsive and works on:
- ✓ Desktop browsers
- ✓ Tablets
- ✓ Mobile phones

## 🚀 Future Enhancements

- User authentication and login
- Payment gateway integration
- Admin dashboard
- Email notifications
- Cancellation and modification of bookings
- Room reviews and ratings
- Python backend integration for analytics

## 👥 Team Collaboration

This project is structured for team development:
- Clean separation of concerns
- Modular routes and models
- Reusable components
- Well-documented code

## 📄 License

ISC License

## 🤝 Support

For issues or questions, contact the development team.

---

**Happy Booking! ☁️🏨**
