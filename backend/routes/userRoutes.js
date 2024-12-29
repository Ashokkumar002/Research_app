//userRoues.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Import the controller functions (ensure correct paths)
const {
  changePassword,
  logout,
  deleteAccount,
  updateProfile,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

// Define your routes and link to the controller functions

// Change password (protected route)
router.put("/change-password", authenticate, changePassword); // Changed POST to PUT

// Logout a user
router.post("/logout", authenticate, logout); // Assuming you want to invalidate a session or token

// Delete user account (protected route)
router.delete("/:id", authenticate, deleteAccount); // Ensure authentication before allowing account deletion

// Update user profile (protected route)
router.put("/update-profile", authenticate, updateProfile); // Ensure authentication before allowing profile update

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Make sure to export the router
module.exports = router;
