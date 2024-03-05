import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"

dotenv.config({path: "../.env"})

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb is connected"))
  .catch((err)=> console.log("Mongodb error", err))

app.listen(3000, () => {
  console.log("server is running on port 3000");
});


