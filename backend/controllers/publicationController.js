const Publication = require("../models/Publication");

// Create a new publication
const createPublication = async (req, res) => {
  try {
    const publication = await Publication.create(req.body);
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all publications
const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPublication, getAllPublications };

