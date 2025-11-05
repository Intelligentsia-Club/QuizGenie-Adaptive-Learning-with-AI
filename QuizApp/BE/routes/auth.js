import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received");
    console.log("Email:", email);
    console.log("Password entered:", password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.email);
    console.log("Stored hash:", user.password);

    const isMatch = await user.comparePassword(password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Login successful");
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Error in /login route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
