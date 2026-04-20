# 🏗️ System Architecture & Developer Guide

## System Overview

Cloud Hotel Reservation System is a three-tier web application:

```
┌─────────────────────────────────────────────────────────────┐
│                      WEB BROWSER                            │
│  (http://localhost:5000)                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         FRONTEND (HTML/CSS/JavaScript)                │ │
│  │  - index.html (UI Structure)                          │ │
│  │  - styles.css (Styling)                               │ │
│  │  - script.js (Logic & API Calls)                      │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────┬────────────────────────────────────────────────┘
               │ HTTP Requests
               │ JSON Responses
               ▼
┌─────────────────────────────────────────────────────────────┐
│            NODE.JS SERVER (PORT 5000)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ server.js - Main Express Application                  │ │
│  │  - CORS Middleware                                    │ │
│  │  - JSON Parser Middleware                             │ │
│  │  - Static File Server                                 │ │
│  │  - Error Handler                                      │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ROUTES - API Endpoints                                │ │
│  │  - routes/bookingRoutes.js (/bookings, /book)         │ │
│  │  - routes/serviceRoutes.js (/services, /service)      │ │
│  │  - routes/roomRoutes.js (/rooms)                      │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ MODELS - Data Schemas                                 │ │
│  │  - models/bookingModel.js (Booking Schema)            │ │
│  │  - models/serviceModel.js (Service Schema)            │ │
│  │  - models/roomModel.js (Room Schema)                  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────┬────────────────────────────────────────────────┘
               │ Mongoose Queries
               │ CRUD Operations
               ▼
┌─────────────────────────────────────────────────────────────┐
│            MONGODB DATABASE (PORT 27017)                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         hotelDB (Database)                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   bookings   │  │   services   │  │    rooms    │ │ │
│  │  │  Collection  │  │  Collection  │  │ Collection  │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 File Organization

### Frontend (`public/`)

**index.html**
- Semantic HTML structure
- 5 main sections: Home, Rooms, Services, Bookings, Alerts
- Form elements for user input
- Containers for dynamic content

**styles.css**
- CSS custom properties (--primary-color, etc.)
- Flexbox and Grid layouts
- Mobile-first responsive design
- Animation keyframes
- Media queries for different screen sizes

**script.js**
- API communication module
- DOM manipulation functions
- Event listeners
- Data loading functions
- Form submission handlers

### Backend (`server.js` & `routes/`)

**server.js**
```
1. Import dependencies
2. Create Express app
3. Setup middleware (CORS, JSON parser)
4. Serve static files
5. Mount routes
6. Define GET /rooms endpoint
7. Setup error handling
8. Start server on port 5000
```

**routes/bookingRoutes.js**
- `POST /book` - Create new booking
- `GET /bookings` - Get all bookings

**routes/serviceRoutes.js**
- `POST /service` - Order service
- `GET /services` - Get all services

**routes/roomRoutes.js**
- `GET /rooms` - Get all rooms
- `POST /rooms` - Add new room

### Database (`database/` & `models/`)

**database/db.js**
- MongoDB connection setup
- Mongoose initialization
- Connection event handlers
- Error logging

**models/bookingModel.js**
```javascript
Schema: {
  customerName: String,
  roomType: String,
  checkIn: String,
  checkOut: String,
  price: Number
}
```

**models/serviceModel.js**
```javascript
Schema: {
  bookingId: String,
  foodItem: String,
  quantity: Number
}
```

**models/roomModel.js**
```javascript
Schema: {
  roomType: String (enum: ["Single", "Double", "Deluxe"]),
  price: Number,
  available: Boolean,
  createdAt: Date
}
```

---

## 🔄 Data Flow

### 1. Booking a Room

```
User Interface                API Server              Database
     │                           │                        │
     │─── Form Input ───────────→│                        │
     │   {customerName,          │                        │
     │    roomType, dates, price}│─── Save Document ─────→│
     │                           │                        │
     │←─ Success Message ────────│←─ Confirmation ────────│
     │                           │                        │
     │─── GET /bookings ────────→│─── Query All ─────────→│
     │                           │                        │
     │←─ All Bookings ───────────│←─ Return Results ─────│
     │   (Displayed on page)     │                        │
```

### 2. Ordering a Service

```
User Interface                API Server              Database
     │                           │                        │
     │─── Service Form ─────────→│                        │
     │   {bookingId,             │                        │
     │    foodItem, quantity}    │─── Save Document ─────→│
     │                           │                        │
     │←─ Success Message ────────│←─ Confirmation ────────│
     │                           │                        │
     │─── GET /services ────────→│─── Query All ─────────→│
     │                           │                        │
     │←─ All Services ───────────│←─ Return Results ─────│
```

---

## 🔌 API Communication Pattern

### Frontend (script.js)
```javascript
// 1. Fetch data from API
const response = await fetch(API_URL + endpoint, options);

// 2. Parse JSON response
const data = await response.json();

// 3. Update DOM
container.innerHTML = generateHTML(data);
```

### Backend (Express)
```javascript
// 1. Receive request
app.post("/endpoint", (req, res) => {
  // 2. Access request body
  const data = req.body;
  
  // 3. Process/save data
  await Model.create(data);
  
  // 4. Send response
  res.json(result);
});
```

---

## 🔐 CORS (Cross-Origin Resource Sharing)

Current configuration in `server.js`:
```javascript
app.use(cors());  // Allows requests from any origin
```

This is set to allow all origins for development. In production, restrict to:
```javascript
app.use(cors({
  origin: "https://yourdomain.com"
}));
```

---

## 🗄️ Database Connection Flow

```
1. Node.js starts
   ↓
2. server.js requires database/db.js
   ↓
3. db.js connects to MongoDB
   ↓
4. Connection event listeners set up
   ↓
5. Models loaded (Booking, Service, Room)
   ↓
6. Server ready to accept requests
   ↓
7. API endpoints can now perform CRUD operations
```

---

## 🌐 Request Lifecycle

### Full Request-Response Cycle

```
1. USER ACTION
   └─ User fills form and clicks "Book"

2. FRONTEND PROCESSING
   └─ script.js collects form data
   └─ Validates input
   └─ Creates JSON object

3. HTTP REQUEST
   └─ POST request sent to /book
   └─ Headers: Content-Type: application/json
   └─ Body: JSON data

4. BACKEND PROCESSING
   └─ Express middleware parses JSON
   └─ router receives request at POST /book
   └─ Creates Booking document
   └─ Saves to MongoDB

5. DATABASE OPERATION
   └─ Mongoose validates schema
   └─ MongoDB inserts document
   └─ Returns saved document with _id

6. BACKEND RESPONSE
   └─ API sends success message
   └─ HTTP status: 200/201
   └─ Response body: JSON data

7. FRONTEND HANDLING
   └─ script.js receives response
   └─ Updates UI with success message
   └─ Calls loadBookings() to refresh list

8. UI UPDATE
   └─ New booking appears on page
   └─ User sees confirmation
```

---

## 🛠️ Configuration Management

### Environment Variables (.env)
```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://127.0.0.1:27017/hotelDB  # DB connection
NODE_ENV=development                         # Environment
```

### Configuration File (config.js)
- Centralizes all configuration
- Reads from environment variables
- Exports configuration object
- Used throughout application

---

## 📊 Data Models Relationships

```
                    ┌──────────────┐
                    │    ROOMS     │
                    │              │
                    │ - roomType   │
                    │ - price      │
                    │ - available  │
                    └──────────────┘
                           ▲
                           │ References
                           │
                    ┌──────────────┐
                    │  BOOKINGS    │
                    │              │
                    │ - customer   │
                    │ - roomType   │
                    │ - checkIn    │
                    │ - checkOut   │
                    │ - price      │
                    └──────────────┘
                           │
                           │ Referenced by
                           ▼
                    ┌──────────────┐
                    │  SERVICES    │
                    │              │
                    │ - bookingId  │
                    │ - foodItem   │
                    │ - quantity   │
                    └──────────────┘
```

---

## 🧪 Testing the System

### 1. Manual Testing
```bash
# Test API health
curl http://localhost:5000/api/health

# Get rooms
curl http://localhost:5000/rooms

# Create booking
curl -X POST http://localhost:5000/book \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","roomType":"Single","checkIn":"2024-04-25","checkOut":"2024-04-26","price":1000}'
```

### 2. Browser Testing
1. Open http://localhost:5000
2. Navigate through sections
3. Fill forms and submit
4. Check browser console for errors
5. Verify data appears in lists

### 3. Database Testing
```bash
# Connect to MongoDB
mongosh

# Use database
use hotelDB

# View collections
show collections

# Query data
db.bookings.find()
db.services.find()
db.rooms.find()
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables set
- [ ] MongoDB connection verified
- [ ] All routes tested
- [ ] Frontend loads without errors
- [ ] API responses correct
- [ ] Error handling working
- [ ] CORS configured for production
- [ ] Database backed up
- [ ] Security review done
- [ ] Performance optimized

---

## 🔍 Debugging Tips

### Common Issues

1. **Port Already in Use**
   - Check what's running on port 5000
   - Kill the process or change PORT in .env

2. **MongoDB Connection Failed**
   - Verify MongoDB is running
   - Check connection string
   - Ensure database exists

3. **CORS Error**
   - Frontend and backend have same origin
   - Check API_URL in script.js

4. **Form Not Submitting**
   - Check browser console for errors
   - Verify form validation
   - Check API endpoint

5. **Data Not Saving**
   - Verify MongoDB connection
   - Check data types match schema
   - Review API response

### Debug Commands

```bash
# Check running processes
netstat -ano | findstr :5000

# MongoDB status
mongod --version

# Node process info
ps aux | grep node

# Server logs
npm start  # (see console output)
```

---

## 📈 Performance Considerations

### Current
- In-memory room list (fast)
- Direct database queries
- No caching
- No pagination

### Future Improvements
- Redis caching layer
- Query pagination
- Database indexing
- Response compression
- Image optimization
- Lazy loading

---

## 🔄 Workflow for Team Development

### Adding a New Feature

1. **Plan**
   - Define requirements
   - Update ROADMAP.md

2. **Frontend**
   - Add HTML in index.html
   - Add CSS in styles.css
   - Add JavaScript in script.js

3. **Backend**
   - Update/create route
   - Add model if needed
   - Test endpoint

4. **Database**
   - Update schema if needed
   - Run seed.js

5. **Document**
   - Update API_DOCS.md
   - Update README.md

6. **Test**
   - Manual testing
   - Browser testing
   - Database testing

---

## 📞 Code Comments & Documentation

All code includes:
- File headers explaining purpose
- Function comments
- Inline comments for complex logic
- Clear variable names
- Proper spacing and formatting

---

## ✅ Quality Checklist

- [ ] Code is readable and well-commented
- [ ] Error handling present
- [ ] Input validation done
- [ ] No console errors
- [ ] Mobile responsive
- [ ] API documented
- [ ] All features working
- [ ] Database connected
- [ ] Deployment ready

---

**This architecture supports easy scaling and future enhancements!** 🚀
