const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  journalName: { type: String, required: true },
  abstract: { type: String },
  publishedDate: { type: Date, default: Date.now },
});

const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;


