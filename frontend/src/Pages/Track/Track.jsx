import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Track.css"; // Ensure this import remains as it links the updated CSS
import NavBar from "../../components/NavBar/NavBar";

const Track = () => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);

  // Fetch published journals
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/journals/published");  // Check if this endpoint is correct
        setJournals(response.data);
      } catch (err) {
        console.error("Error fetching journals:", err);
        setError("Failed to load journals. Please try again later.");
      }
    };

    fetchJournals();
  }, []);

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
              <div className="journal-card" key={journal._id}>
                <h3>{journal.journalName}</h3>
                <p><strong>Status:</strong> {journal.status}</p>

                {/* If the journal was rejected, show feedback */}
                {journal.status === "rejected" && journal.feedback && (
                  <p className="feedback"><strong>Feedback:</strong> {journal.feedback}</p>
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
