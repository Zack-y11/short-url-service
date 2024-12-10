// api/index.ts
import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "../src/routes/urlsRoutes";

dotenv.config();

// Create Express instance
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined');
    
    // Configure MongoDB connection (suitable for serverless)
    await mongoose.connect(uri, {
      maxPoolSize: 10,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.get("/api", (req, res) => {
  res.send("Welcome to URL Shortener API");
});
app.use("/api", urlRoutes);  // Changed from "/api/shorten" to "/api"

// Connect to MongoDB when the app starts
connectDB();

// Export the Express API
export default app;
