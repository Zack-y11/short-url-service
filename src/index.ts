import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "../src/routes/urlsRoutes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to URL Shortener API");
});
app.use("/shorten", urlRoutes);

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Connected To DB"))
  .catch((e) => console.log("Mongo db connection error: ", e));

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

module.exports = app;
