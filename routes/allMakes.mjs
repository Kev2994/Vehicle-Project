import express from "express";
const router = express.Router();
import { getProcessedData } from "../controller/allMakes.mjs";

router.get("/", getProcessedData);

export { router };
