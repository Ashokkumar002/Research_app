// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/authController");

// Register routes and associate them with the corresponding controller methods
router.post("/register", createUser);
router.post("/login", login);

module.exports = router;
