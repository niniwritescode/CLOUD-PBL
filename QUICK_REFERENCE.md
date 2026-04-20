# 📚 Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode (auto-reload)
npm run dev

# Seed database
npm run seed
```

## 🌐 URLs

| URL | Purpose |
|-----|---------|
| http://localhost:5000 | Application frontend |
| http://localhost:5000/api/health | Health check |
| http://localhost:5000/rooms | Get rooms (API) |
| http://localhost:5000/bookings | Get bookings (API) |
| http://localhost:5000/services | Get services (API) |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Project overview |
| [QUICKSTART.md](./QUICKSTART.md) | 3-minute setup |
| [SETUP.md](./SETUP.md) | Detailed installation |
| [API_DOCS.md](./API_DOCS.md) | API reference |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design |
| [ROADMAP.md](./ROADMAP.md) | Future features |
| [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) | What was built |

---

## 🔌 API Endpoints Quick Ref

### Rooms
```
GET    /rooms              - Get all rooms
POST   /rooms              - Add new room
```

### Bookings
```
GET    /bookings           - Get all bookings
POST   /book               - Create booking
```

### Services
```
GET    /services           - Get all services
POST   /service            - Order service
```

---

## 📝 Request Templates

### Create Booking
```bash
curl -X POST http://localhost:5000/book \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "roomType": "Double",
    "checkIn": "2024-04-25",
    "checkOut": "2024-04-28",
    "price": 1800
  }'
```

### Order Service
```bash
curl -X POST http://localhost:5000/service \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "booking123",
    "foodItem": "Breakfast",
    "quantity": 2
  }'
```

---

## 🗂️ Project Structure

```
Cloud/
├── public/           # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── routes/           # API routes
├── models/           # Database schemas
├── database/         # DB connection
├── server.js         # Main server
├── seed.js           # Database seeding
├── package.json      # Dependencies
└── .env              # Configuration
```

---

## 🔍 Debugging Commands

### Check if server is running
```bash
curl http://localhost:5000/api/health
```

### Check MongoDB
```bash
mongosh  # Connect to MongoDB
use hotelDB
show collections
db.bookings.find()
```

### Kill process on port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 📊 Room Prices

| Room Type | Price |
|-----------|-------|
| Single | ₹1,000 |
| Double | ₹1,800 |
| Deluxe | ₹3,000 |

---

## 🔐 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hotelDB
NODE_ENV=development
```

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🎨 Color Scheme

| Color | Use |
|-------|-----|
| #3498db (Blue) | Primary actions, headers |
| #2c3e50 (Dark) | Text, secondary elements |
| #27ae60 (Green) | Success messages, status |
| #e74c3c (Red) | Errors, warnings |
| #ecf0f1 (Light) | Backgrounds, cards |

---

## 📋 Database Schema Quick Ref

### Booking
```javascript
{
  customerName: String,
  roomType: String,
  checkIn: String,
  checkOut: String,
  price: Number
}
```

### Service
```javascript
{
  bookingId: String,
  foodItem: String,
  quantity: Number
}
```

### Room
```javascript
{
  roomType: String,
  price: Number,
  available: Boolean,
  createdAt: Date
}
```

---

## 🧪 Testing Checklist

- [ ] Can access http://localhost:5000
- [ ] Room list loads
- [ ] Can book a room
- [ ] Booking appears in list
- [ ] Can order service
- [ ] Service appears in list
- [ ] Health check works
- [ ] No console errors

---

## 🆘 Troubleshooting Quick Ref

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| MongoDB error | Start mongod or check URI in .env |
| CORS error | Verify API_URL in script.js |
| Frontend not loading | Clear browser cache, check /public folder |
| API calls failing | Check MongoDB connection, verify server running |
| No data showing | Check browser console, verify API response |

---

## 📞 Common Tasks

### Add a New Room Type
1. Update priceMap in script.js
2. Update seed.js with new room
3. Run `npm run seed`

### Change Server Port
1. Edit .env: `PORT=3000`
2. Restart server: `npm start`

### Reset Database
1. Delete MongoDB data or use MongoDB compass
2. Run `npm run seed` again

### View Server Logs
1. Run `npm start` (logs in console)
2. Check for errors and warnings

---

## 🎯 Next Steps After Setup

1. ✅ Run `npm install`
2. ✅ Run `npm run seed`
3. ✅ Run `npm start`
4. ✅ Open http://localhost:5000
5. ✅ Book a room
6. ✅ Order a service
7. ✅ View bookings
8. ✅ Check database with mongosh

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🆘 Need Help?

1. Check [SETUP.md](./SETUP.md) for detailed instructions
2. Review [API_DOCS.md](./API_DOCS.md) for API details
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
4. Check browser console for errors
5. Check server logs for errors

---

**Last Updated:** April 20, 2024
**Version:** 1.0.0
