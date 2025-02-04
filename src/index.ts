import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlsRoutes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// Basic route to test if the API is working
app.get("/", (req, res) => {
  res.json({ message: "Welcome to URL Shortener API" });
});

// Use URL routes without the /api prefix
app.use("/", urlRoutes);

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Connected To DB"))
  .catch((e) => console.log("Mongo db connection error: ", e));

// Export the Express API
export default app;
