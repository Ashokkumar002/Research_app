const express = require("express");
const { searchJournals } = require("../controllers/journalController");

const router = express.Router();

// Route to search journals
router.get("/search", searchJournals);

module.exports = router;
