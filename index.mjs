import express from "express";
import { router } from "./routes/allMakes.mjs";

const app = express();

app.get("/", router);

app.listen(3000, () => {
  console.log("app is running");
});
