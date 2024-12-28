//userRoues.js
const express = require("express");
const router = express.Router();

// Import the controller functions (ensure correct paths)
const {
  changePassword,
  logout,
  deleteAccount,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

// Define your routes and link to the controller functions

// Change password (protected route)
router.put("/change-password", authenticate, changePassword); // Changed POST to PUT

// Logout a user
router.post("/logout", authenticate, logout); // Assuming you want to invalidate a session or token

// Delete user account (protected route)
router.delete("/:id", authenticate, deleteAccount); // Ensure authentication before allowing account deletion

// Make sure to export the router
module.exports = router;
