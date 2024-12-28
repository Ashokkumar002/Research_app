import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [pendingJournals, setPendingJournals] = useState([]);
  const [error, setError] = useState(null);

  // Fetch pending journals from backend
  useEffect(() => {
    const fetchPendingJournals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/publications");
        console.log("Fetched Pending Journals:", response.data); // Log the response
        if (response.data.message) {
          setError(response.data.message); // Handle "No pending journals"
        } else {
          setPendingJournals(response.data);
        }
      } catch (err) {
        console.error("Error fetching pending journals:", err);
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
      console.log("Journal approved:", response.data);
      // After approval, remove from pending
      setPendingJournals((prevJournals) =>
        prevJournals.filter((journal) => journal._id !== id)
      );
    } catch (error) {
      console.error("Error approving journal:", error);
      setError("Failed to approve journal.");
    }
  };

  // Reject Journal
  const rejectJournal = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/publications/${id}`,
        { status: "rejected" }
      );
      console.log("Journal rejected:", response.data);
      // After rejection, remove from pending
      setPendingJournals((prevJournals) =>
        prevJournals.filter((journal) => journal._id !== id)
      );
    } catch (error) {
      console.error("Error rejecting journal:", error);
      setError("Failed to reject journal.");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p>{error}</p>}
      {pendingJournals.length === 0 ? (
        <p>No pending journals to review.</p>
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
                <button onClick={() => rejectJournal(journal._id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;





