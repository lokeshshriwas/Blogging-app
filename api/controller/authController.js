import User from "../models/userModels.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"))
  }

  const hashpassword = bcryptjs.hashSync(password, 10)

  try {
    await User.create({
      username,
      email,
      password: hashpassword
    });
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error)
  }
};
