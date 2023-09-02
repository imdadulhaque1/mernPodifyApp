import express from "express";
import "dotenv/config"; //!dotenv must be before than db
import "./db";

const app = express();
const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
