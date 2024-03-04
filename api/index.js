import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";

dotenv.config({path: "../.env"})

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb is connected"))
  .catch((err)=> console.log(err))

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
