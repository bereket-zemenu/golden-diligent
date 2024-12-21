import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import path from "path";  // Make sure to import 'path' at the top

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// API route
app.use("/api/user", userRouter);

// Serve static files from the React build directory
const __dirname = path.resolve();  // This emulates __dirname in ES Modules
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// Catch-all route to serve the React index.html file for any route
// Handle React routing, return all requests to React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
