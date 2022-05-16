import express from "express";
import { router } from "./routes/allMakes.mjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import { getProcessedData } from "./scheduleTask.mjs";
import { ApolloServer, gql } from "apollo-server";
import { Vehicle } from "./model/vehicleModel.mjs";

dotenv.config();

var today = new Date();

const app = express();

const task = cron.schedule(
  `${today.getMinutes() + 1} ${today.getHours()}} * * *`,
  getProcessedData
);

task.start();

mongoose.connect(process.env.Mongo_URL).then(() => {
  console.log("connected");
});

app.get("/", router);

app.listen(3000, () => {
  console.log("app is running");
});
