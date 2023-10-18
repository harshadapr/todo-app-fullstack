const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret"; // Replace this with a more secure secret or use env variables

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "Username already taken." });
    }

    const user = new User({ username, password });
    await user.save();

    // Generate JWT token for the newly registered user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in." });
  }
};
