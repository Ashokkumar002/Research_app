const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const publicationsFilePath = path.join(__dirname, "../publications.json");

// Fetch all published journals for a specific user
// Fetch all published journals for a specific user
router.get("/published", (req, res) => {
  try {
    const { user_id } = req.query; // Get the user_id from the query parameters
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    
    // Filter journals by the user_id
    const userJournals = publications.filter(
      (journal) => journal.user_id === user_id && (journal.status === "approved" || journal.status === "rejected" || journal.status === "pending")
    );
    
    res.status(200).json(userJournals);
  } catch (error) {
    console.error("Error fetching published journals:", error);
    res.status(500).json({ message: "Error fetching published journals." });
  }
});


module.exports = router;
