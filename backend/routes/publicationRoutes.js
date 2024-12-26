const express = require("express");
const router = express.Router();
const { createPublication, getAllPublications } = require("../controllers/publicationController");

// POST /api/publications - Create a new publication
router.post("/", createPublication);

// GET /api/publications - Get all publications
router.get("/", getAllPublications);

module.exports = router;


