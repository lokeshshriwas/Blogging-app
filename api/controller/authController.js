import User from "../models/userModels.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
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
    res.status(500).json({message: error.message})
  }
};
