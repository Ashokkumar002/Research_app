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
  const { username, email, mobile_no, password } = req.body;

  if (!username || !email || !mobile_no || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectDB();

    // Check if the email is already registered
    const existingUser = await db
      .collection(COLLECTION_NAME)
      .findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Determine the next user ID
    const lastUser = await db
      .collection(COLLECTION_NAME)
      .find()
      .sort({ _id: -1 }) // Sort in descending order by _id
      .limit(1)
      .toArray();

    const nextUserId = lastUser.length > 0 ? lastUser[0]._id + 1 : 10000;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      _id: nextUserId,
      username,
      email,
      mobile_no,
      password: hashedPassword,
      role: "user", // Default role
      status: "active", // Default status
      createdAt: new Date(),
    };

    await db.collection(COLLECTION_NAME).insertOne(newUser);

    res
      .status(201)
      .json({ message: "User registered successfully", userId: nextUserId });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
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

    // Find the user by email or mobile number
    const user = await db.collection(COLLECTION_NAME).findOne({
      $or: [{ email: credential }, { mobile_no: credential }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token and user data
    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      mobile_no: user.mobile_no,
      role: user.role,
      profileImage: user.profileImage, // Add other user fields as necessary
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse, // Send user data in response
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
