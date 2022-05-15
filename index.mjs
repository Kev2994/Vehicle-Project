import express from "express";
import { router } from "./routes/allMakes.mjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Vehicle } from "./model/vehicleModel.mjs";
import cron from "node-cron";
import { getProcessedData } from "./scheduleTask.mjs";

dotenv.config();

const app = express();

const task = cron.schedule("0 */5 * * * *", getProcessedData);

task.start();

mongoose.connect(process.env.Mongo_URL).then(() => {
  console.log("connected");
});

app.get("/", router);

app.listen(3000, () => {
  console.log("app is running");
});
