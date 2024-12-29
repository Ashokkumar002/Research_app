// models/tokenBlacklist.js
const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // Token expires after 1 day
  },
  { collection: "tokenblacklists" } // Ensure correct collection name
);

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklist;
