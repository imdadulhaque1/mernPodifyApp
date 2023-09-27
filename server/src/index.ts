import express from "express";
import "dotenv/config"; //!dotenv must be before than db
import "./db/indexDB";

import authRouter from "./api/routes/authRoute";

const app = express();

// Register the Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
