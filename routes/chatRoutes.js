const express = require("express");
const router = express.Router();

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_MODEL = process.env.HUGGING_FACE_MODEL || "gpt2";

const fallbackPatterns = [
    {
        pattern: /\b(?:hello|hi|hey|greetings|good morning|good evening)\b/i,
        replies: [
            "Hello! I’m your hotel assistant. I can help with rooms, booking steps, and services.",
            "Hi there! Ask me about room prices, bookings, or hotel services and I’ll guide you through it."
        ]
    },
    {
        pattern: /\b(?:room pricing|room prices|room rate|room rates|room cost|room costs|room charge|room charges)\b/i,
        replies: [
            "Our room prices are: Single ₹1000, Double ₹1800, Deluxe ₹3000. Pick the option you want in the Book Room section.",
            "You can book a Single room for ₹1000, a Double room for ₹1800, or a Deluxe room for ₹3000. Just select a room and complete the form."
        ]
    },
    {
        pattern: /\b(?:how much|what(?:'s| is) the price|how expensive|cost of|price of)\b.*\b(?:room|rooms|single|double|deluxe|suite)\b/i,
        replies: [
            "Our room prices are: Single ₹1000, Double ₹1800, Deluxe ₹3000. Pick the option you want in the Book Room section.",
            "You can book a Single room for ₹1000, a Double room for ₹1800, or a Deluxe room for ₹3000. Just select a room and complete the form."
        ]
    },
    {
        pattern: /\b(?:room|rooms|single|double|deluxe|suite)\b.*\b(?:price|pricing|prices|cost|costs|rate|rates|charges|fee|fees)\b|\b(?:price|pricing|prices|cost|costs|rate|rates|charges|fee|fees)\b.*\b(?:room|rooms|single|double|deluxe|suite)\b/i,
        replies: [
            "Our room prices are: Single ₹1000, Double ₹1800, Deluxe ₹3000. Pick the option you want in the Book Room section.",
            "You can book a Single room for ₹1000, a Double room for ₹1800, or a Deluxe room for ₹3000. Just select a room and complete the form."
        ]
    },
    {
        pattern: /\b(?:available|availability|available rooms|vacancy)\b/i,
        replies: [
            "All room types are shown in the Book Room section. Click a room card to select it and the price will update automatically.",
            "Check availability by visiting the Book Room section and selecting the type you want. I’ll help you choose the right option."
        ]
    },
    {
        pattern: /\b(?:book|reserve|booking|reserve a room|reserve room|book room|how do i book|how can i book|how to book|how do i reserve|how can i reserve)\b/i,
        replies: [
            "To book a room, open Book Room, choose the type, enter your name and dates, then submit the form.",
            "Booking is easy: select a room type, set your check-in and check-out dates, then confirm the reservation."
        ]
    },
    {
        pattern: /\b(?:order|service|food|spa|breakfast|laundry|room service|amenity)\b/i,
        replies: [
            "To order a service, go to Services, enter your booking ID, choose the item, and submit the request.",
            "Services like breakfast or spa can be ordered through the Services section. Enter your booking ID and what you'd like to request."
        ]
    },
    {
        pattern: /\b(?:what can you do|help|assist|support)\b/i,
        replies: [
            "I can help you compare room types, explain how booking works, and guide you through ordering services.",
            "Ask me about room prices, booking steps, service orders, or how to use the hotel app. I’m here to assist."
        ]
    },
    {
        pattern: /\b(?:who are you|what are you|assistant|ai|bot)\b/i,
        replies: [
            "I’m your hotel AI assistant built to help with reservations, room details, and hotel services.",
            "I’m a virtual assistant for the hotel app, here to answer questions and guide you through bookings and service ordering."
        ]
    },
    {
        pattern: /\b(?:thank you|thanks|thx|thankyou)\b/i,
        replies: [
            "You’re welcome! If you need more help, just ask.",
            "Glad to help! Let me know if you want room suggestions or service details."
        ]
    }
];

function chooseFallbackReply(replies) {
    return replies[Math.floor(Math.random() * replies.length)];
}

function localFallbackReply(message) {
    const normalized = message.trim().toLowerCase();

    for (const item of fallbackPatterns) {
        if (item.pattern.test(message)) {
            return chooseFallbackReply(item.replies);
        }
    }

    if (normalized.includes("room pricing") || normalized.includes("room prices") || normalized.includes("room rate") || normalized.includes("room rates") || normalized.includes("how much") && normalized.includes("room")) {
        return chooseFallbackReply(fallbackPatterns[1].replies);
    }

    if (normalized.includes("how do i book") || normalized.includes("how can i book") || normalized.includes("how to book") || normalized.includes("book a room") || normalized.includes("reserve a room") || normalized.includes("how do i reserve")) {
        return chooseFallbackReply(fallbackPatterns[5].replies);
    }

    return "I’m here to help with hotel bookings, room options, and services. Try asking things like ‘room pricing’, ‘how do I book’, or ‘order service’.";
}

async function getHuggingFaceReply(message) {
    if (!HUGGING_FACE_API_KEY) {
        return null;
    }

    if (typeof fetch !== "function") {
        return null;
    }

    try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${HUGGING_FACE_MODEL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: message })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Hugging Face error:", data);
            return null;
        }

        if (Array.isArray(data) && data[0] && data[0].generated_text) {
            return data[0].generated_text.trim();
        }

        if (data && data.generated_text) {
            return data.generated_text.trim();
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch Hugging Face reply:", error);
        return null;
    }
}

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        let reply = null;

        if (HUGGING_FACE_API_KEY) {
            reply = await getHuggingFaceReply(message);
        }

        if (!reply) {
            reply = localFallbackReply(message);
        }

        res.json({ success: true, reply });
    } catch (error) {
        console.error("Chat route error:", error);
        res.status(500).json({ error: "Unable to process chat request." });
    }
});

module.exports = router;
