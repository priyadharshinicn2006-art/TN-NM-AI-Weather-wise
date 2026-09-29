// index.js
// This is the main entry point of the AI WeatherWise backend.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Route files
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Connect to MongoDB
connectDB();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "AI WeatherWise API is running" });
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/ai", aiRoutes);

// Error handling (must be registered AFTER routes)
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AI WeatherWise server running on http://localhost:${PORT}`);
});