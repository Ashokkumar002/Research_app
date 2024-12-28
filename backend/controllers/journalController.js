const axios = require("axios");

// Search journals by keyword or abstract
exports.searchJournals = async (req, res) => {
  const { query } = req.query; // Accept a `query` parameter for search
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  try {
    // Call CrossRef API
    const response = await axios.get(`${process.env.CROSSREF_API_URL}`, {
      params: { query },
    });

    // Extract relevant data
    const results = response.data.message.items.map((item) => ({
      title: item.title ? item.title[0] : "No Title",
      abstract: item.abstract || "No Abstract",
      doi: item.DOI,
      authors: item.author
        ? item.author
            .map((author) => `${author.given} ${author.family}`)
            .join(", ")
        : "No Authors",
      link: item.URL,
    }));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching journals from CrossRef.",
      error: error.message,
    });
  }
};
