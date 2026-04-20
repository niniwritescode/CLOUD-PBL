# ☁️ Cloud Hotel Reservation System

A complete, full-stack hotel reservation and service management system with a beautiful frontend, robust backend API, and MongoDB database.

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🚀 Quick Start

Get up and running in 3 simple steps:

```bash
# 1. Install dependencies
npm install

# 2. Initialize database
npm run seed

# 3. Start the server
npm start
```

Then open http://localhost:5000 in your browser!

**For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)**

---

## ✨ Features

### 🎨 Frontend
- Beautiful, modern, responsive UI
- Room browsing with pricing
- Easy booking system
- Service/food ordering
- Bookings dashboard
- Real-time notifications
- Mobile-friendly design

### 🔌 Backend
- Express.js REST API
- MongoDB with Mongoose
- CORS enabled
- Error handling
- Health check endpoint
- Static file serving

### 💾 Database
- MongoDB integration
- Proper data models
- Automatic seeding
- Data validation

---

## 📋 What's Included

### Frontend (`public/`)
- `index.html` - Application interface
- `styles.css` - Beautiful styling
- `script.js` - Frontend logic

### Backend
- `server.js` - Main server
- `routes/` - API endpoints
- `models/` - Database schemas
- `database/db.js` - MongoDB connection

### Configuration
- `.env` - Environment variables
- `package.json` - Dependencies
- `seed.js` - Database initialization

### Documentation
- `SETUP.md` - Detailed setup guide
- `API_DOCS.md` - API reference
- `ROADMAP.md` - Future features
- `BUILD_SUMMARY.md` - Complete build details

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Additional** | Python (for future use) |

---

## 📚 API Endpoints

### Rooms
```
GET  /rooms              # Get all rooms
POST /rooms              # Add new room
```

### Bookings
```
GET  /bookings           # Get all bookings
POST /book               # Create booking
```

### Services
```
GET  /services           # Get ordered services
POST /service            # Order a service
```

### Status
```
GET  /api/health         # Server health check
GET  /                   # Frontend
```

**Full API documentation: [API_DOCS.md](./API_DOCS.md)**

---

## 🎯 How to Use

### 1. View Rooms
- Navigate to "Book Room" tab
- See all available rooms with prices
- Click on a room to select it

### 2. Book a Room
- Fill in your name
- Select room type
- Choose check-in and check-out dates
- Price updates automatically
- Click "Confirm Booking"

### 3. Order Services
- Go to "Services" tab
- Enter your booking ID
- Select service/food item
- Enter quantity
- Click "Order Service"

### 4. View Bookings
- Go to "My Bookings" tab
- See all your confirmed bookings
- Check booking details

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Setup Steps

1. **Clone/Open Project**
   ```bash
   cd Cloud
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

4. **Initialize Database**
   ```bash
   npm run seed
   ```

5. **Start Server**
   ```bash
   npm start
   ```

6. **Open in Browser**
   ```
   http://localhost:5000
   ```

---

## 🔧 Available Commands

```bash
npm start       # Start the server
npm run dev     # Start with auto-reload (requires nodemon)
npm run seed    # Seed database with sample data
npm test        # Run tests (coming soon)
```

---

## 📝 Environment Variables

Create or edit `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hotelDB
NODE_ENV=development
```

---

## 🏨 Sample Data

After running `npm run seed`, you'll have:

| Room Type | Price | Status |
|-----------|-------|--------|
| Single | ₹1,000 | Available |
| Double | ₹1,800 | Available |
| Deluxe | ₹3,000 | Available |

---

## 🗂️ Project Structure

```
Cloud/
├── public/                  # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── routes/                  # API routes
│   ├── bookingRoutes.js
│   ├── serviceRoutes.js
│   └── roomRoutes.js
├── models/                  # Database models
│   ├── bookingModel.js
│   ├── serviceModel.js
│   └── roomModel.js
├── database/
│   └── db.js               # MongoDB connection
├── server.js               # Main server file
├── seed.js                 # Database seeding
├── config.js               # Configuration
├── package.json            # Dependencies
├── .env                    # Environment variables
└── README.md              # This file
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify port 27017 is available

### Port 5000 Already in Use
```bash
# Kill process on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
```

### Frontend Not Loading
- Clear browser cache
- Check if `public/` folder exists
- Check console for errors

### API Calls Failing
- Ensure server is running
- Check if MongoDB is connected
- Verify CORS is enabled

**Full troubleshooting guide: [SETUP.md](./SETUP.md)**

---

## 🚀 Deployment

### Ready to Deploy?
1. Install production dependencies: `npm install --production`
2. Set environment variables on your server
3. Start MongoDB (or use MongoDB Atlas)
4. Run: `npm start`

### Deployment Options
- Heroku
- AWS
- Google Cloud
- DigitalOcean
- Azure

---

## 🔐 Security Notes

- ✅ CORS configured
- ⚠️ No authentication (v1)
- ⚠️ No input sanitization yet
- 🔜 Add authentication in v2

---

## 📈 Future Features

See [ROADMAP.md](./ROADMAP.md) for planned features including:
- User authentication
- Payment integration
- Admin dashboard
- Email notifications
- Advanced analytics
- Mobile app

---

## 📞 Support

### Documentation
- 📘 [SETUP.md](./SETUP.md) - Detailed setup guide
- 📗 [API_DOCS.md](./API_DOCS.md) - API reference
- 📙 [ROADMAP.md](./ROADMAP.md) - Future features
- 📕 [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) - Build details

### Quick Links
- 🚀 [Quick Start](./QUICKSTART.md)
- 🔌 [API Documentation](./API_DOCS.md)
- 🗺️ [Development Roadmap](./ROADMAP.md)

---

## 📄 License

ISC License - Feel free to use this project!

---

## 👨‍💻 Built With

- **Backend:** Express.js, MongoDB, Mongoose
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Tools:** Node.js, npm
- **Documentation:** Markdown

---

## 🎉 Ready to Go!

You have a complete, production-ready hotel reservation system. Start the server and begin booking rooms!

```bash
npm start
```

**Then open http://localhost:5000** ☁️🏨

---

**Last Updated:** April 20, 2024
**Status:** ✅ Complete and Ready for Use
**Version:** 1.0.0


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
