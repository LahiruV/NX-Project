const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user"); // Import user model instead of userSchema

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password
    } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email }); // Use User model instead of userSchema
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

function generateId() {
  return (
    new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
  );
}

module.exports = router;
