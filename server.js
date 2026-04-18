const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// sample room data
let rooms = [
 {id:1,type:"Single",price:1000,available:true},
 {id:2,type:"Double",price:1800,available:true},
 {id:3,type:"Deluxe",price:3000,available:true}
];

// bookings
let bookings = [];

// services
let services = [];

// get rooms
app.get("/rooms",(req,res)=>{
 res.json(rooms);
});

// book room
app.post("/book",(req,res)=>{
 const booking=req.body;
 bookings.push(booking);
 res.send("Room booked successfully");
});

// order food/service
app.post("/service",(req,res)=>{
 const service=req.body;
 services.push(service);
 res.send("Service ordered");
});

// view bookings
app.get("/bookings",(req,res)=>{
 res.json(bookings);
});

app.get("/",(req,res)=>{
 res.send("Cloud Hotel Reservation SaaS Running");
});

app.listen(5000,()=>{
 console.log("Server running on port 5000");
});