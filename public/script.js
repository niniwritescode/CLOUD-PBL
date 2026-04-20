const API_URL = "http://localhost:5000";

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadRooms();
    loadServices();
    loadBookings();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    const bookingForm = document.getElementById("bookingForm");
    const serviceForm = document.getElementById("serviceForm");
    const roomTypeSelect = document.getElementById("roomType");

    if (bookingForm) {
        bookingForm.addEventListener("submit", submitBooking);
    }

    if (serviceForm) {
        serviceForm.addEventListener("submit", submitService);
    }

    if (roomTypeSelect) {
        roomTypeSelect.addEventListener("change", updatePrice);
    }
}

// Show/Hide Sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add("active");
    }

    // Reload data when switching sections
    if (sectionId === "bookings") {
        loadBookings();
    } else if (sectionId === "services") {
        loadServices();
    }
}

// Load Rooms
async function loadRooms() {
    try {
        const response = await fetch(`${API_URL}/rooms`);
        const rooms = await response.json();

        const roomsContainer = document.getElementById("roomsContainer");
        roomsContainer.innerHTML = "";

        rooms.forEach(room => {
            const roomCard = document.createElement("div");
            roomCard.className = "room-card";
            roomCard.innerHTML = `
                <h4>${room.type} Room</h4>
                <p class="price">₹${room.price.toLocaleString()}</p>
                <p class="status">${room.available ? "✓ Available" : "✗ Not Available"}</p>
            `;
            roomCard.addEventListener("click", () => {
                selectRoom(room);
            });
            roomsContainer.appendChild(roomCard);
        });
    } catch (error) {
        console.error("Error loading rooms:", error);
        showAlert("Failed to load rooms", "error");
    }
}

// Select Room
function selectRoom(room) {
    document.getElementById("roomType").value = room.type;
    document.getElementById("price").value = room.price;
    showAlert(`${room.type} room selected - ₹${room.price}`, "info");
}

// Update Price
function updatePrice() {
    const roomType = document.getElementById("roomType").value;
    const priceMap = {
        "Single": 1000,
        "Double": 1800,
        "Deluxe": 3000
    };
    document.getElementById("price").value = priceMap[roomType] || 0;
}

// Submit Booking
async function submitBooking(e) {
    e.preventDefault();

    const booking = {
        customerName: document.getElementById("customerName").value,
        roomType: document.getElementById("roomType").value,
        checkIn: document.getElementById("checkIn").value,
        checkOut: document.getElementById("checkOut").value,
        price: document.getElementById("price").value
    };

    try {
        const response = await fetch(`${API_URL}/book`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            showAlert("Room booked successfully!", "success");
            document.getElementById("bookingForm").reset();
            loadBookings();
            setTimeout(() => showSection("bookings"), 1500);
        } else {
            showAlert("Failed to book room", "error");
        }
    } catch (error) {
        console.error("Error booking room:", error);
        showAlert("Error: " + error.message, "error");
    }
}

// Load Services
async function loadServices() {
    try {
        const response = await fetch(`${API_URL}/services`);
        const services = await response.json();

        const servicesContainer = document.getElementById("servicesContainer");
        servicesContainer.innerHTML = "";

        if (services.length === 0) {
            servicesContainer.innerHTML = "<p style='text-align: center; color: #999;'>No services ordered yet</p>";
            return;
        }

        services.forEach(service => {
            const serviceItem = document.createElement("div");
            serviceItem.className = "service-item";
            serviceItem.innerHTML = `
                <h4>${service.foodItem}</h4>
                <p><strong>Booking ID:</strong> ${service.bookingId}</p>
                <p><strong>Quantity:</strong> ${service.quantity}</p>
                <span class="status">Ordered</span>
            `;
            servicesContainer.appendChild(serviceItem);
        });
    } catch (error) {
        console.error("Error loading services:", error);
        showAlert("Failed to load services", "error");
    }
}

// Submit Service
async function submitService(e) {
    e.preventDefault();

    const service = {
        bookingId: document.getElementById("bookingId").value,
        foodItem: document.getElementById("foodItem").value,
        quantity: parseInt(document.getElementById("quantity").value)
    };

    try {
        const response = await fetch(`${API_URL}/service`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(service)
        });

        if (response.ok) {
            showAlert("Service ordered successfully!", "success");
            document.getElementById("serviceForm").reset();
            loadServices();
        } else {
            showAlert("Failed to order service", "error");
        }
    } catch (error) {
        console.error("Error ordering service:", error);
        showAlert("Error: " + error.message, "error");
    }
}

// Load Bookings
async function loadBookings() {
    try {
        const response = await fetch(`${API_URL}/bookings`);
        const bookings = await response.json();

        const bookingsContainer = document.getElementById("bookingsContainer");
        bookingsContainer.innerHTML = "";

        if (bookings.length === 0) {
            bookingsContainer.innerHTML = "<p style='text-align: center; color: #999;'>No bookings yet</p>";
            return;
        }

        bookings.forEach((booking, index) => {
            const bookingItem = document.createElement("div");
            bookingItem.className = "booking-item";
            bookingItem.innerHTML = `
                <h4>Booking #${index + 1}</h4>
                <p><strong>Guest Name:</strong> ${booking.customerName}</p>
                <p><strong>Room Type:</strong> ${booking.roomType}</p>
                <p><strong>Check-In:</strong> ${booking.checkIn}</p>
                <p><strong>Check-Out:</strong> ${booking.checkOut}</p>
                <p><strong>Price:</strong> ₹${booking.price.toLocaleString()}</p>
                <span class="status">Confirmed</span>
            `;
            bookingsContainer.appendChild(bookingItem);
        });
    } catch (error) {
        console.error("Error loading bookings:", error);
        showAlert("Failed to load bookings", "error");
    }
}

// Show Alert
function showAlert(message, type = "info") {
    const alertDiv = document.getElementById("alertMessage");
    alertDiv.textContent = message;
    alertDiv.className = `alert ${type}`;
    alertDiv.style.display = "block";

    setTimeout(() => {
        alertDiv.style.display = "none";
    }, 3000);
}
