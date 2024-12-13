import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Initialize Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
