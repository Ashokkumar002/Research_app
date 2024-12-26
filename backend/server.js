const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Ensure the 'uploads' directory exists for file storage
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create 'uploads' folder if it doesn't exist
}

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create unique filenames
  }
});
const upload = multer({ storage: storage });

// Routes
const journalRoutes = require("./routes/journalRoutes");
app.use("/api/journals", journalRoutes);

// Route to handle submitting a journal (with file upload)
app.post('/api/publications', upload.single('file'), (req, res) => {
  const { title, authors, journalName, abstract } = req.body;
  const journalFile = req.file; // The uploaded file

  if (!journalFile) {
    return res.status(400).json({ message: 'File is required.' });
  }

  // Prepare the new publication data with a 'pending' status
  const newPublication = {
    title,
    authors: authors.split(',').map((author) => author.trim()), // Split comma-separated authors
    journalName,
    abstract,
    filePath: journalFile.path, // Save the file path
    status: 'pending', // Initially set status to 'pending'
  };

  // Save the publication data (in this case, to a JSON file)
  const publicationsFilePath = path.join(__dirname, 'publications.json');
  let publications = [];

  if (fs.existsSync(publicationsFilePath)) {
    publications = JSON.parse(fs.readFileSync(publicationsFilePath)); // Read existing publications
  }

  publications.push(newPublication); // Add the new publication
  fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2)); // Save to file

  return res.status(200).json({
    message: 'Journal is awaiting review.',
    filePath: journalFile.path, // Send back the file path for reference
  });
});

// Route for admin to get the list of journals with 'pending' status
app.get('/api/admin/publications', (req, res) => {
  const publicationsFilePath = path.join(__dirname, 'publications.json');
  if (!fs.existsSync(publicationsFilePath)) {
    return res.status(404).json({ message: 'No publications found.' });
  }

  const publications = JSON.parse(fs.readFileSync(publicationsFilePath));
  const pendingPublications = publications.filter(pub => pub.status === 'pending'); // Only 'pending' journals

  return res.status(200).json(pendingPublications);
});

// Route for admin to approve or reject a journal
app.put('/api/admin/publications/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  const publicationsFilePath = path.join(__dirname, 'publications.json');
  if (!fs.existsSync(publicationsFilePath)) {
    return res.status(404).json({ message: 'No publications found.' });
  }

  const publications = JSON.parse(fs.readFileSync(publicationsFilePath));
  const publicationIndex = publications.findIndex(pub => pub._id === id);

  if (publicationIndex === -1) {
    return res.status(404).json({ message: 'Publication not found.' });
  }

  if (status !== 'approved' && status !== 'rejected') {
    return res.status(400).json({ message: 'Invalid status. Must be "approved" or "rejected".' });
  }

  // Update the publication status
  publications[publicationIndex].status = status;

  fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2));

  return res.status(200).json({ message: `Journal has been ${status}.` });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



