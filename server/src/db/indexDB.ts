import mongoose from "mongoose";
import { MONGO_URI } from "@/utils/variables";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Server Successfully Connected!");
  })
  .catch((error) => {
    console.log("Server Connection Failed:", error);
  });
