import express from "express";
const router = express.Router();
import { getVehicleData } from "../controller/allMakes.mjs";
import { Vehicle } from "../model/vehicleModel.mjs";

router.get("/", getVehicleData);

export { router };
