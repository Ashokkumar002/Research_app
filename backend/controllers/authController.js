/// authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB } = require("../config/db");

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const COLLECTION_NAME = "Auth";
console.log("JWT_SECRET", JWT_SECRET);

// User registration
exports.createUser = async (req, res) => {
  const { id, name, email, password, mobile_no } = req.body;

  if (!id || !name || !email || !password || !mobile_no) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectDB();

    // Ensure unique email and mobile_no
    await db
      .collection(COLLECTION_NAME)
      .createIndex({ email: 1 }, { unique: true });
    await db
      .collection(COLLECTION_NAME)
      .createIndex({ mobile_no: 1 }, { unique: true });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      _id: id,
      name,
      email,
      password: hashedPassword,
      mobile_no,
      status: "active", // Default status
    };

    // Insert user data
    await db.collection(COLLECTION_NAME).insertOne(userData);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        message: `Duplicate value for ${field}: ${error.keyValue[field]}`,
      });
    }
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error. error: " + error.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    return res
      .status(400)
      .json({ message: "Credential and password are required" });
  }

  try {
    const db = await connectDB();

    const user = await db.collection(COLLECTION_NAME).findOne({
      $or: [{ email: credential }, { mobile_no: credential }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
