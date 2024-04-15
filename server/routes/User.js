const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (!name || !username || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, password: hashedPassword });
    savedUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
    res.status(201).json({ token, message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ token, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
