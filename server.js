import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/flightsDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema and Model
const flightSchema = new mongoose.Schema({
  airline: String,
  airlineName: String,
  flightNumber: String,
  departureAirport: String,
  departureTime: String,
  arrivalAirport: String,
  arrivalTime: String,
  price: String,
  cabin: String,
  bookingClass: String
});

const Flight = mongoose.model("Flight", flightSchema);

// Save Flight Route
app.post("/save-flight", async (req, res) => {
  try {
    console.log("🔍 Received Flight Data:", req.body); // Debugging

    // Check if flight exists by flightNumber
    const existingFlight = await Flight.findOne({ flightNumber: req.body.flightNumber });

    if (existingFlight) {
      console.log("Existing Flight Found:", existingFlight);
      return res.json({ message: "Flight already saved!" });
    }

    // Save all fields properly
    const newFlight = new Flight(req.body);  // ✅ This will save all fields
    await newFlight.save();

    res.json({ message: "Flight saved successfully!" });

  } catch (error) {
    console.error("Error saving flight:", error);
    res.status(500).json({ error: "Failed to save flight" });
  }
});

// Fetch Saved Flights Route
app.get("/saved-flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
