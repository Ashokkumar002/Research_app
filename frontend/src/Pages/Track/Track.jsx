import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Track.css";
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from "../../context/userContext"; // Import UserContext

const Track = () => {
  const { user } = useContext(UserContext); // Get the user context
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);

  // Fetch published journals only if user exists
  useEffect(() => {
    if (!user || !user.id) {
      setError("User not logged in.");
      return;
    }

    const fetchJournals = async () => {
      try {
        const response = await axios.get(
          `https://automated-journal-finder.onrender.com/api/journals/published?user_id=${user.id}`
        );
        console.log("Fetched journals:", response.data); // Log the response
        setJournals(response.data);
      } catch (err) {
        console.error("Error fetching journals:", err);
        setError("Failed to load journals. Please try again later.");
      }
    };

    fetchJournals();
  }, [user]);
  // Dependency on user, to refetch when user changes

  return (
    <div>
      <NavBar />
      <div className="track-container">
        <h1>Track Your Research</h1>

        {/* Display Error if any */}
        {error && <p className="error">{error}</p>}

        {/* Display journals if any */}
        {journals.length === 0 ? (
          <div className="no-journals">
            <p>No journals to display.</p>
          </div>
        ) : (
          <div className="journal-cards">
            {journals.map((journal) => (
              <div
                className={`journal-card ${
                  journal.status === "approved"
                    ? "approved"
                    : journal.status === "rejected"
                    ? "rejected"
                    : "pending"
                }`}
                key={journal._id}
              >
                <h3>{journal.journalName}</h3>
                <p>
                  <strong>Status:</strong> {journal.status}
                </p>

                {/* Display Published Date */}

                {/* Display Status Approval Date */}
                {journal.status === "approved" && journal.statusUpdatedAt && (
                  <p>
                    <strong>Journal Approved:</strong>{" "}
                    {new Date(journal.statusUpdatedAt).toLocaleDateString()}{" "}
                    {new Date(journal.statusUpdatedAt).toLocaleTimeString()}
                  </p>
                )}

                {/* If the journal was rejected, show feedback */}
                {journal.status === "rejected" && journal.feedback && (
                  <p className="feedback">
                    <strong>Feedback:</strong> {journal.feedback}
                  </p>
                )}

                {/* Display Status Rejection Date */}
                {journal.status === "rejected" && journal.statusUpdatedAt && (
                  <p>
                    <strong>Journal Rejected:</strong>{" "}
                    {new Date(journal.statusUpdatedAt).toLocaleDateString()}{" "}
                    {new Date(journal.statusUpdatedAt).toLocaleTimeString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
