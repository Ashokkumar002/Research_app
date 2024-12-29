const bcrypt = require("bcrypt");
const { connectDB } = require("../config/db");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

// Load environment variables
const COLLECTION_NAME = "Auth";

// Change password
exports.changePassword = async (req, res) => {
  console.log("User from token:", req.user); // Log req.user to verify it
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both passwords are required" });
  }

  try {
    const db = await connectDB();

    const user = await db.collection(COLLECTION_NAME).findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: userId }, { $set: { password: hashedPassword } });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout the user by blacklisting the token in Redis
exports.logout = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Remove the 'Bearer ' prefix
    const jwtToken = token.split(" ")[1];

    // Set the JWT token in Redis with an expiration time (e.g., 1 hour)
    const decoded = jwt.decode(jwtToken);
    const tokenExpiration = decoded.exp - Math.floor(Date.now() / 1000); // Get token expiration time

    // Store the token in Redis with an expiration time equal to the JWT expiration time
    await redis.setex(`blacklisted:${jwtToken}`, tokenExpiration, "true");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  const userId = req.params.id;

  try {
    const db = await connectDB();

    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const userId = req.user?.id; // Extract the user ID from the authenticated token
  const { username, email, mobile_no } = req.body;

  if (!username || !email || !mobile_no) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectDB();

    // Find the user in the database
    const user = await db.collection(COLLECTION_NAME).findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user details
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: userId },
      {
        $set: {
          username,
          email,
          mobile_no,
        },
      }
    );

    // Return the updated user details
    const updatedUser = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: userId });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
