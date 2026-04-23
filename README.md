# ☁️ Cloud Hotel Reservation System

A full-stack hotel reservation and service management app with a refreshed UI, file-based backend, and a floating AI chatbot assistant.

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🚀 Quick Start

Get running in 3 simple steps:

```bash
npm install
npm start
```

Then open http://localhost:5000 in your browser.

---

## ✨ New Updates

- Floating AI chat widget for hotel help
- Smarter local chatbot responses for booking and pricing questions
- Blue/black modern frontend theme
- File-based JSON database for easy local development
- Chat API endpoint at `/chat`

---

## ✨ Features

### 🎨 Frontend
- Modern responsive UI
- Floating chatbot bubble
- Room browsing with pricing
- Easy booking form
- Service ordering
- Booking dashboard
- Mobile-friendly layout

### 🔌 Backend
- Node.js + Express REST API
- File-based JSON database in `data/`
- Local chatbot support via `/chat`
- Static frontend serving
- Health check endpoint

### 💾 Data Storage
- JSON files in `data/`
- No external database required
- Simple local persistence

---

## 📋 What's Included

### Frontend (`public/`)
- `index.html` — main UI
- `styles.css` — updated blue-black theme
- `script.js` — app logic + chatbot behavior

### Backend
- `server.js` — server entry point
- `routes/` — API routes
- `routes/chatRoutes.js` — chatbot API
- `database/filedb.js` — JSON file storage

### Configuration
- `.env.example` — sample environment file
- `package.json` — dependencies and scripts

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | File-based JSON (`data/` folder) |

---

## 📚 API Endpoints

### Rooms
```
GET  /rooms       # Get room list
POST /rooms       # Add a room
```

### Bookings
```
GET  /bookings    # Get all bookings
POST /book        # Create booking
```

### Services
```
GET  /services    # Get ordered services
POST /service     # Order a service
```

### Chat
```
POST /chat        # Send message to local chatbot
```

### Status
```
GET /api/health   # Health check
GET /              # Frontend
```

---

## 🎯 How to Use

### 1. Browse Rooms
- Open the app
- Click "Book Room"
- See available rooms and prices
- Click a room card to select it

### 2. Book a Room
- Fill in your name
- Choose room type
- Set check-in and check-out dates
- Price updates automatically
- Submit the form

### 3. Order Services
- Open "Services"
- Enter booking ID
- Enter food or service item
- Enter quantity
- Submit request

### 4. Use the Chatbot
- Click the floating chat bubble
- Ask about pricing, booking, or services
- Get local AI-style responses instantly

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- npm

### Setup Steps

1. Clone or open the repo
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the app
   ```bash
   npm start
   ```
4. Open the browser
   ```text
   http://localhost:5000
   ```

---

## 🔧 Available Commands

```bash
npm start       # Start the server
npm run dev     # Start with auto-reload (requires nodemon)
```

---

## 📝 Environment Variables

Create a `.env` file if you need custom settings.

```env
PORT=5000
```

Optional for AI integration:

```env
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
HUGGING_FACE_MODEL=gpt2
```

---

## 🗂️ Project Structure

```
Cloud/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── routes/
│   ├── bookingRoutes.js
│   ├── chatRoutes.js
│   ├── roomRoutes.js
│   └── serviceRoutes.js
├── database/
│   └── filedb.js
├── data/
│   ├── bookings.json
│   ├── rooms.json
│   └── services.json
├── server.js
├── package.json
├── .env.example
└── README.md
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
