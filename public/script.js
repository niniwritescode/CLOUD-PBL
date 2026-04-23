const API_URL = "";

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadRooms();
    loadServices();
    loadBookings();
    setupEventListeners();
    loadChatWelcome();
});

// Setup Event Listeners
function setupEventListeners() {
    const bookingForm = document.getElementById("bookingForm");
    const serviceForm = document.getElementById("serviceForm");
    const chatForm = document.getElementById("chatForm");
    const roomTypeSelect = document.getElementById("roomType");
    const chatToggleBtn = document.getElementById("chatToggleBtn");
    const chatCloseBtn = document.querySelector(".chat-close");

    if (bookingForm) {
        bookingForm.addEventListener("submit", submitBooking);
    }

    if (serviceForm) {
        serviceForm.addEventListener("submit", submitService);
    }

    if (chatForm) {
        chatForm.addEventListener("submit", sendChatMessage);
    }

    if (roomTypeSelect) {
        roomTypeSelect.addEventListener("change", updatePrice);
    }

    if (chatToggleBtn) {
        chatToggleBtn.addEventListener("click", () => toggleChatWidget(true));
    }

    if (chatCloseBtn) {
        chatCloseBtn.addEventListener("click", () => toggleChatWidget(false));
    }
}

// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add("active");
    }

    if (sectionId === "bookings") {
        loadBookings();
    } else if (sectionId === "services") {
        loadServices();
    } else if (sectionId === "chatbot") {
        document.getElementById("chatInput").focus();
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
            roomCard.addEventListener("click", () => selectRoom(room));
            roomsContainer.appendChild(roomCard);
        });
    } catch (error) {
        console.error("Error loading rooms:", error);
        showAlert("Failed to load rooms", "error");
    }
}

// Select Room
function selectRoom(room) {
    const roomTypeInput = document.getElementById("roomType");
    const priceInput = document.getElementById("price");

    if (roomTypeInput) roomTypeInput.value = room.type;
    if (priceInput) priceInput.value = room.price;

    showAlert(`${room.type} room selected - ₹${room.price}`, "info");
}

// Update Price
function updatePrice() {
    const roomType = document.getElementById("roomType").value;
    const priceMap = {
        Single: 1000,
        Double: 1800,
        Deluxe: 3000
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
            setTimeout(() => showSection("bookings"), 1200);
        } else {
            const error = await response.json();
            showAlert(error.error || "Failed to book room", "error");
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
        quantity: parseInt(document.getElementById("quantity").value, 10)
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
            const error = await response.json();
            showAlert(error.error || "Failed to order service", "error");
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
                <p><strong>Price:</strong> ₹${Number(booking.price).toLocaleString()}</p>
                <span class="status">Confirmed</span>
            `;
            bookingsContainer.appendChild(bookingItem);
        });
    } catch (error) {
        console.error("Error loading bookings:", error);
        showAlert("Failed to load bookings", "error");
    }
}

// Chat
async function sendChatMessage(e) {
    e.preventDefault();

    const chatInput = document.getElementById("chatInput");
    const message = chatInput.value.trim();
    if (!message) return;

    appendChatMessage(message, "user");
    chatInput.value = "";
    setChatLoading(true);

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const reply = data.reply || "Sorry, I couldn't answer that right now.";
        appendChatMessage(reply, "bot");
    } catch (error) {
        console.error("Chat error:", error);
        appendChatMessage("I couldn't connect to the AI assistant. Please try again later.", "bot");
    } finally {
        setChatLoading(false);
    }
}

function appendChatMessage(message, sender) {
    const chatMessages = document.getElementById("chatMessages");
    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${sender}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadChatWelcome() {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages || chatMessages.children.length > 0) return;
    appendChatMessage("Hello! I can help with room details, bookings, and services. Ask me anything.", "bot");
}

function toggleChatWidget(open) {
    const widget = document.getElementById("chatWidget");
    const button = document.getElementById("chatToggleBtn");
    if (!widget || !button) return;

    widget.classList.toggle("hidden", !open);
    button.classList.toggle("hidden", open);

    if (open) {
        loadChatWelcome();
        const chatInput = document.getElementById("chatInput");
        if (chatInput) {
            chatInput.focus();
        }
    }
}

function setChatLoading(isLoading) {
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    if (!chatForm || !chatInput) return;

    if (isLoading) {
        chatForm.classList.add("loading");
        chatInput.placeholder = "Waiting for response...";
        chatInput.disabled = true;
    } else {
        chatForm.classList.remove("loading");
        chatInput.placeholder = "Ask about rooms, bookings, or services...";
        chatInput.disabled = false;
        chatInput.focus();
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
