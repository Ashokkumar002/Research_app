const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const publicationsFilePath = path.join(__dirname, "../publications.json");

// Get all pending journals
router.get("/pending", (req, res) => {
  try {
    const publications = JSON.parse(
      fs.readFileSync(publicationsFilePath, "utf8")
    );
    const pendingJournals = publications.filter(
      (journal) => journal.status === "pending"
    );

    if (pendingJournals.length === 0) {
      return res
        .status(200)
        .json({ message: "No pending journals to review." });
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

  if (!filePath) {
    return res.status(400).json({ message: "filePath is required." });
  }

  try {
    const publications = JSON.parse(
      fs.readFileSync(publicationsFilePath, "utf8")
    );
    const journalIndex = publications.findIndex(
      (journal) => journal.filePath === filePath
    );

    if (journalIndex === -1) {
      return res.status(404).json({ message: "Journal not found." });
    }

    publications[journalIndex].status = "approved"; // Update status
    fs.writeFileSync(
      publicationsFilePath,
      JSON.stringify(publications, null, 2)
    );

    res.status(200).json({ message: "Journal approved successfully." });
  } catch (error) {
    console.error("Error approving journal:", error);
    res.status(500).json({ message: "Failed to approve journal." });
  }
});

// Reject journal and send feedback
router.put("/reject/:id", (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body;

  console.log("Reject request received:");
  console.log("ID:", id);
  console.log("Feedback:", feedback);

  try {
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    const journalIndex = publications.findIndex((journal) => journal._id === id);

    console.log("Publications found:", publications);

    if (journalIndex === -1) {
      console.log("Journal not found.");
      return res.status(404).json({ message: "Journal not found." });
    }

    publications[journalIndex].status = "rejected";
    if (feedback) {
      publications[journalIndex].feedback = feedback;
    }

    fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2));

    console.log("Journal rejected successfully.");
    res.status(200).json({ message: "Journal rejected successfully." });
  } catch (error) {
    console.error("Error rejecting journal:", error);
    res.status(500).json({ message: "Error rejecting journal." });
  }
});


module.exports = router;
