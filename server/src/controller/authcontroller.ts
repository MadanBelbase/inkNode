import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// SIGNUP
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, email, phone, location, password, terms } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: "Email or username already exists" });
      return;
    }

    const user = new User({ fullName, username, email, phone, location, password, terms });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.json({ message: "Server error during signup" });
  }
};

// LOGIN
export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  
  } catch (err) {
    console.error("Login error:", err);
    res.json({ message: "Server error during login" });
  }
};
export const  getProfile  = async (req: Request , res : Response ) :  Promise<void>  => {
    
}