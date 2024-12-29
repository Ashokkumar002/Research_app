const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_no: { type: String, required: true },
  status: { type: String, default: "active" },
  role: { type: String, default: "user" },
  profileImage: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
