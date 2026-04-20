# 🔌 Cloud Hotel API Documentation

## Base URL
```
http://localhost:5000
```

## Content-Type
All requests and responses use `application/json`

---

## 📊 Endpoints

### 1. Rooms

#### Get All Rooms
```
GET /rooms
```

**Response:**
```json
[
    {
        "id": 1,
        "type": "Single",
        "price": 1000,
        "available": true
    },
    {
        "id": 2,
        "type": "Double",
        "price": 1800,
        "available": true
    },
    {
        "id": 3,
        "type": "Deluxe",
        "price": 3000,
        "available": true
    }
]
```

#### Add New Room
```
POST /rooms
```

**Request Body:**
```json
{
    "roomType": "Single",
    "price": 1000,
    "available": true
}
```

**Response:**
```json
{
    "_id": "507f1f77bcf86cd799439011",
    "roomType": "Single",
    "price": 1000,
    "available": true,
    "createdAt": "2024-04-20T10:30:00.000Z"
}
```

---

### 2. Bookings

#### Get All Bookings
```
GET /bookings
```

**Response:**
```json
[
    {
        "_id": "507f1f77bcf86cd799439012",
        "customerName": "John Doe",
        "roomType": "Double",
        "checkIn": "2024-04-25",
        "checkOut": "2024-04-28",
        "price": 1800
    }
]
```

#### Create New Booking
```
POST /book
```

**Request Body:**
```json
{
    "customerName": "John Doe",
    "roomType": "Double",
    "checkIn": "2024-04-25",
    "checkOut": "2024-04-28",
    "price": 1800
}
```

**Response:**
```
Room booked successfully
```

---

### 3. Services

#### Get All Services
```
GET /services
```

**Response:**
```json
[
    {
        "_id": "507f1f77bcf86cd799439013",
        "bookingId": "507f1f77bcf86cd799439012",
        "foodItem": "Breakfast",
        "quantity": 2
    }
]
```

#### Order New Service
```
POST /service
```

**Request Body:**
```json
{
    "bookingId": "507f1f77bcf86cd799439012",
    "foodItem": "Room Service - Dinner",
    "quantity": 1
}
```

**Response:**
```
Service ordered successfully
```

---

## 🏥 Health Check

```
GET /api/health
```

**Response:**
```json
{
    "status": "Cloud Hotel Server Running",
    "port": 5000,
    "timestamp": "2024-04-20T10:30:00.000Z",
    "environment": "development"
}
```

---

## ✅ Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## 📝 Examples

### Example 1: Book a Room

**Frontend Request:**
```javascript
fetch("http://localhost:5000/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        customerName: "Alice Johnson",
        roomType: "Deluxe",
        checkIn: "2024-05-01",
        checkOut: "2024-05-05",
        price: 3000
    })
})
```

**Response:**
```
Room booked successfully
```

### Example 2: Get All Bookings

**Frontend Request:**
```javascript
fetch("http://localhost:5000/bookings")
    .then(res => res.json())
    .then(data => console.log(data))
```

**Response:**
```json
[
    {
        "_id": "507f1f77bcf86cd799439012",
        "customerName": "Alice Johnson",
        "roomType": "Deluxe",
        "checkIn": "2024-05-01",
        "checkOut": "2024-05-05",
        "price": 3000
    }
]
```

### Example 3: Order a Service

**Frontend Request:**
```javascript
fetch("http://localhost:5000/service", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        bookingId: "507f1f77bcf86cd799439012",
        foodItem: "Spa Treatment",
        quantity: 1
    })
})
```

**Response:**
```
Service ordered successfully
```

---

## 🔒 CORS Configuration

CORS is enabled for all origins. To restrict, update `server.js`:

```javascript
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
```

---

## 🚀 Rate Limiting (Future)

Rate limiting can be added using `express-rate-limit`:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);
```

---

## 📚 Data Models

### Room Model
```javascript
{
    id: Number,
    type: String,           // "Single", "Double", "Deluxe"
    price: Number,
    available: Boolean
}
```

### Booking Model
```javascript
{
    _id: ObjectId,
    customerName: String,
    roomType: String,
    checkIn: String,        // YYYY-MM-DD
    checkOut: String,       // YYYY-MM-DD
    price: Number
}
```

### Service Model
```javascript
{
    _id: ObjectId,
    bookingId: String,
    foodItem: String,
    quantity: Number
}
```

---

## 🧪 Testing API with cURL

```bash
# Get all rooms
curl http://localhost:5000/rooms

# Create a booking
curl -X POST http://localhost:5000/book \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test User","roomType":"Single","checkIn":"2024-04-25","checkOut":"2024-04-26","price":1000}'

# Get all bookings
curl http://localhost:5000/bookings

# Health check
curl http://localhost:5000/api/health
```

---

## 🐛 Error Handling

All errors return JSON format:

```json
{
    "error": "Error message here"
}
```

---

## 📞 Support

For API issues or questions, check the browser console or server logs for detailed error messages.

Happy Coding! ☁️
