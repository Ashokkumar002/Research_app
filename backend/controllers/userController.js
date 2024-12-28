//userController.js
const bcrypt = require("bcrypt");
const { connectDB } = require("../config/db");

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

// Logout
exports.logout = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Optionally handle token invalidation here, as we aren't using Redis.
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
