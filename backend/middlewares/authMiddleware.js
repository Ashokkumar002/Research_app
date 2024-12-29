// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Check if the token is blacklisted in Redis
    const blacklisted = await redis.get(`blacklisted:${token}`);

    if (blacklisted) {
      return res
        .status(401)
        .json({ message: "Token is blacklisted. Please log in again." });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request object

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};
