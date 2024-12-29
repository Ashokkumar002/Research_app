const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const publicationsFilePath = path.join(__dirname, "../publications.json");

// Fetch all published journals
router.get("/published", (req, res) => {
  try {
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    const publishedJournals = publications.filter(
      (journal) => journal.status === "approved" || journal.status === "rejected" || journal.status === "pending"
    );
    res.status(200).json(publishedJournals);
  } catch (error) {
    console.error("Error fetching published journals:", error);
    res.status(500).json({ message: "Error fetching published journals." });
  }
});

module.exports = router;
