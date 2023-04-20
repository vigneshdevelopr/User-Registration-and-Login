import express from "express";
import { User, generateAuthToken } from "../Models/Users.js";
import bcrypt from "bcrypt";

const router = express.Router();
//code functionality:
router.get("/login", async (req, res) => {
  let user = await User.find();
  return res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //validate password:
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateAuthToken(user._id);

    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
});

export const Login = router;
