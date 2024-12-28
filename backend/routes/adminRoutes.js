const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const publicationsFilePath = path.join(__dirname, "../publications.json");

// Get all pending journals
router.get("/pending", (req, res) => {
  try {
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    const pendingJournals = publications.filter((journal) => journal.status === "pending");

    if (pendingJournals.length === 0) {
      return res.status(200).json({ message: "No pending journals to review." });
    }

    res.status(200).json(pendingJournals);
  } catch (error) {
    console.error("Error fetching pending journals:", error);
    res.status(500).json({ message: "Error fetching pending journals." });
  }
});

// Approve journal
router.put("/approve", (req, res) => {
  const { filePath } = req.body;

  try {
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    const journalIndex = publications.findIndex((journal) => journal.filePath === filePath);

    if (journalIndex === -1) {
      return res.status(404).json({ message: "Journal not found." });
    }

    publications[journalIndex].status = "approved"; // Update status
    fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2));

    res.status(200).json({ message: "Journal approved successfully." });
  } catch (error) {
    console.error("Error approving journal:", error);
    res.status(500).json({ message: "Failed to approve journal." });
  }
});

// Reject journal
router.put("/reject", (req, res) => {
  const { filePath } = req.body;

  try {
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    const journalIndex = publications.findIndex((journal) => journal.filePath === filePath);

    if (journalIndex === -1) {
      return res.status(404).json({ message: "Journal not found." });
    }

    publications[journalIndex].status = "rejected"; // Update status
    fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2));

    res.status(200).json({ message: "Journal rejected successfully." });
  } catch (error) {
    console.error("Error rejecting journal:", error);
    res.status(500).json({ message: "Failed to reject journal." });
  }
});

module.exports = router;







