var express = require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var app = express();
app.use(express.json());
app.use(cors());

var { MongoClient } = require("mongodb");

const DATABASE_NAME = "UserDB";
const MONGODB_URL =
  "mongodb+srv://nithishrana17:hXBXoK6uYix9ZPny@cluster0.pn1pv.mongodb.net/";
const client = new MongoClient(MONGODB_URL);

// JWT Secret Key
const JWT_SECRET = "your_secret_key_here";

// Create User Endpoint with Password Hashing
app.post("/createUser", async (req, res) => {
  let { id, name, email, password, mobile_no } = req.body;

  if (!id || !name || !email || !password || !mobile_no) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let data = {
      _id: id,
      name: name,
      email: email,
      password: hashedPassword,
      mobile_no: mobile_no,
    };

    await client.connect();
    let db = client.db(DATABASE_NAME);
    await db.collection("Auth").insertOne(data);
    res.status(200).json({ message: "Created New User Record!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User ID already exists" });
    }
    res.status(500).json({ message: "Error creating User record", error });
  } finally {
    await client.close();
  }
});

app.post("/updateUserField", async (req, res) => {
  let { id, field, value } = req.body;

  // Validate input
  if (!id || !field || !value) {
    return res
      .status(400)
      .json({ message: "ID, field, and value are required" });
  }

  try {
    // Connect to MongoDB
    await client.connect();
    let db = client.db(DATABASE_NAME);

    // Build the update object dynamically
    let updateObject = {};
    updateObject[field] = value;

    // Update the user document
    const result = await db
      .collection("Auth")
      .updateOne({ _id: id }, { $set: updateObject });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User field updated successfully" });
  } catch (error) {
    console.error("Error updating User field:", error);
    res.status(500).json({ message: "Error updating User field", error });
  } finally {
    // Close the database connection
    await client.close();
  }
});

// Login Endpoint with Password Validation
app.post("/login", async (req, res) => {
  let { credential, password } = req.body;

  if (!credential || !password) {
    return res
      .status(400)
      .json({ message: "Credential and password are required" });
  }

  try {
    await client.connect();
    let db = client.db(DATABASE_NAME);

    // Find user by user_name, email_id, or mobile_no
    let user = await db.collection("Auth").findOne({
      $or: [
        { name: credential },
        { email: credential },
        { mobile_no: credential },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", error });
  } finally {
    await client.close();
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
