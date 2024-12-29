import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [pendingJournals, setPendingJournals] = useState([]);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(""); // State for feedback
  const [rejectedJournal, setRejectedJournal] = useState(null); // State to track rejected journal
  const [feedbackError, setFeedbackError] = useState(""); // State for feedback error message

  // Fetch pending journals from backend
  useEffect(() => {
    const fetchPendingJournals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/publications");
        if (response.data.message) {
          setError(response.data.message); // Handle "No pending journals"
        } else {
          setPendingJournals(response.data);
        }
      } catch (err) {
        setError("Failed to fetch journals.");
      }
    };

    fetchPendingJournals();
  }, []);

  // Approve Journal
  const approveJournal = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/publications/${id}`,
        { status: "approved" }
      );
      setPendingJournals(prevJournals =>
        prevJournals.filter(journal => journal._id !== id)
      );
    } catch (error) {
      setError("Failed to approve journal.");
    }
  };

  const rejectJournal = async (id, feedback) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reject/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Journal rejected successfully.");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error rejecting journal:", error);
    }
  };
  const handleReject = (id) => {
    const feedback = prompt("Enter rejection feedback:");
    if (feedback) {
      rejectJournal(id, feedback);
    } else {
      alert("Feedback is required to reject a journal.");
    }
  };
  
  
  

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    setFeedbackError(""); // Clear error when typing feedback
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      setFeedbackError("Please provide feedback before submitting.");
      return;
    }
    // Optionally, submit feedback to the backend or perform further actions here.
    setFeedbackError(""); // Clear error after submission
    alert("Feedback submitted successfully!");
  };

  return (
    <div>
      <div className="admin"><h1>Admin Dashboard</h1></div>

      {error && <p>{error}</p>}

      {pendingJournals.length === 0 ? (
        <div className="no-journals">
          <p>No pending journals to review.</p>
        </div>
      ) : (
        <ul>
          {pendingJournals.map((journal) => (
            <li key={journal._id}>
              <h3>{journal.title}</h3>
              <p><strong>Authors:</strong> {journal.authors.join(", ")}</p>
              <p><strong>Abstract:</strong> {journal.abstract}</p>
              <p><strong>Journal Name:</strong> {journal.journalName}</p>
              <a href={`http://localhost:5000/${journal.filePath}`} target="_blank" rel="noopener noreferrer">
                Open File
              </a>
              <div>
                <button onClick={() => approveJournal(journal._id)}>Approve</button>
                {/* Reject Button */}
                <button onClick={() => handleReject(journal._id)}>Reject</button>
              </div>

              {/* Conditionally show feedback section if journal has been rejected */}
              {rejectedJournal === journal._id && (
                <div className="feedback-section">
                  <h4>Provide Feedback for Rejection</h4>
                  <textarea
                    placeholder="Please provide your feedback here"
                    value={feedback}
                    onChange={handleFeedbackChange}
                  />
                  {feedbackError && <p className="error">{feedbackError}</p>}
                  <button onClick={submitFeedback}>Submit Feedback</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
