import express from "express";
import { router } from "./routes/allMakes.mjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Vehicle } from "./model/vehicleModel.mjs";

dotenv.config();

const app = express();

mongoose.connect(process.env.Mongo_URL).then(() => {
  console.log("connected");
});

app.get("/", router);

app.listen(3000, () => {
  console.log("app is running");
});
