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

// Reject journal and send feedback
router.put("/reject/:id", (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body; // Get feedback from request body

  try {
    const publications = JSON.parse(fs.readFileSync(publicationsFilePath, "utf8"));
    const journalIndex = publications.findIndex((journal) => journal._id === id);

    if (journalIndex === -1) {
      return res.status(404).json({ message: "Journal not found." });
    }

    // Update journal status and add feedback
    publications[journalIndex].status = "rejected";
    if (feedback) {
      publications[journalIndex].feedback = feedback;  // Save feedback
    }

    // Write updated publications back to the file
    fs.writeFileSync(publicationsFilePath, JSON.stringify(publications, null, 2));

    // Optional: Send rejection email (If needed)
    // Assuming you want to send an email when the journal is rejected.
    //const publisherEmail = publications[journalIndex].publisherEmail;
    //sendRejectionEmail(publisherEmail, feedback);

    res.status(200).json({ message: "Journal rejected successfully." });
  } catch (error) {
    console.error("Error rejecting journal:", error);
    res.status(500).json({ message: "Error rejecting journal." });
  }
});

// Function to send rejection email (example with nodemailer)
const sendRejectionEmail = (publisherEmail, feedback) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD // Your email password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: publisherEmail,
    subject: "Your Journal Submission - Rejected",
    text: `Your journal submission has been rejected. Here is the feedback from the admin: \n\n${feedback}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = router;
