const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const publicationsFilePath = path.join(__dirname, "publications.json");

// Journal schema (used for validation or other tasks if needed)
const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  journalName: { type: String, required: true },
  abstract: { type: String, required: true },
  filePath: { type: String, required: true }, // File path in the uploads directory
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

// Model for MongoDB (though not used anymore for saving publications, can still be useful for validation)
const Journal = mongoose.model("Journal", journalSchema);

// Utility functions for managing journals in publications.json

// Read the existing publications from the JSON file
const readPublications = () => {
  if (fs.existsSync(publicationsFilePath)) {
    return JSON.parse(fs.readFileSync(publicationsFilePath, "utf-8"));
  }
  return [];
};

// Save publications to the JSON file
const savePublications = (publications) => {
  fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2));
};

// Add a new journal publication (could be used for both approval or submission)
const addJournal = (journalData) => {
  const publications = readPublications();
  publications.push(journalData); // Add new journal
  savePublications(publications);
};

// Approve or reject a journal by filePath
const updateJournalStatus = (filePath, status) => {
  const publications = readPublications();
  const publicationIndex = publications.findIndex((pub) => pub.filePath === filePath);

  if (publicationIndex === -1) {
    return null; // Journal not found
  }

  // Update the status of the journal
  publications[publicationIndex].status = status;
  savePublications(publications);

  return publications[publicationIndex]; // Return the updated journal
};

// Get pending journals
const getPendingJournals = () => {
  const publications = readPublications();
  return publications.filter((pub) => pub.status === "pending");
};

// Export the functions and model if needed
module.exports = {
  Journal, // This could still be used for validation if required
  addJournal,
  updateJournalStatus,
  getPendingJournals,
};



