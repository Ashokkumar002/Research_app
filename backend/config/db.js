// config/db.js
const mongoose = require("mongoose");
const URI =
  "mongodb+srv://" +
  process.env.MONGODB_UP +
  "@cluster0.pn1pv.mongodb.net/JournalDB?retryWrites=true&w=majority&appName=Cluster0";

let dbInstance = null;

const connectDB = async () => {
  if (dbInstance) return dbInstance;

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    dbInstance = mongoose.connection;
    console.log("Connected to MongoDB");
    return dbInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Could not connect to database");
  }
};

module.exports = { connectDB };
