import React, { useState } from 'react';
import './FindJournal.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const FindJournal = () => {
  const [searchType, setSearchType] = useState('keyword'); // Default search type
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle search type switch (keyword/abstract)
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setInputValue(''); // Clear the input when switching search type
    setResults([]); // Clear previous results
    setError(null); // Clear errors
  };

  // Update input value as the user types
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Perform the search by calling the backend
  const handleSearch = async () => {
    if (!inputValue.trim()) {
      alert('Please enter a value to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Send request to the backend (not directly to CrossRef)
      const queryParams = searchType === 'keyword' ? { keyword: inputValue } : { abstract: inputValue };
      const response = await fetch(
      `http://localhost:5000/api/journals/search?query=${encodeURIComponent(inputValue)}`
    );

      if (!response.ok) {
        throw new Error('Failed to fetch journals. Please try again.');
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('No results found. Try another search.');
      } else {
        setResults(data); // Store the search results
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="find-journal-container">
        <h1 className="title">Find a Journal</h1>

        {/* Radio Buttons for Search Type */}
        <div className="radio-container">
          <label className="radio-label">
            <input
              type="radio"
              value="keyword"
              checked={searchType === 'keyword'}
              onChange={handleSearchTypeChange}
              className="radio-button"
            />
            Search by Keyword
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="abstract"
              checked={searchType === 'abstract'}
              onChange={handleSearchTypeChange}
              className="radio-button"
            />
            Search by Abstract
          </label>
        </div>

        {/* Input Field */}
        <div className="input-container">
          {searchType === 'keyword' ? (
            <input
              type="text"
              placeholder="Enter keyword..."
              value={inputValue}
              onChange={handleInputChange}
              className="input-field"
            />
          ) : (
            <textarea
              placeholder="Paste your abstract here..."
              value={inputValue}
              onChange={handleInputChange}
              className="textarea-field"
            ></textarea>
          )}
        </div>

        {/* Search Button */}
        <button onClick={handleSearch} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Results Section */}
        <div className="results-container">
  {results.length > 0 && (
    <div className="cards-container">
      {results.map((journal, index) => (
        <div key={index} className="journal-card">
          <h3 className="card-title">{journal.title}</h3>
          <p className="card-authors">
            <strong>Authors:</strong> {journal.authors || 'Unknown'}
          </p>

          {/* Abstract with HTML formatting */}
          <div className="card-abstract" dangerouslySetInnerHTML={{ __html: journal.abstract }}></div>

          {/* Displaying the link */}
          <a
            href={journal.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  )}
</div>


      </div>
    </div>
  );
};

export default FindJournal;


