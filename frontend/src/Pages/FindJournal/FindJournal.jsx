import React, { useState } from 'react';
import './FindJournal.css'; // Import the CSS file
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';


const FindJournal = () => {
  const [searchType, setSearchType] = useState('keyword'); // Default to 'keyword'
  const [inputValue, setInputValue] = useState('');

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setInputValue(''); // Clear the input when switching search type
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      alert('Please enter a value to search.');
      return;
    }

    if (searchType === 'keyword') {
      console.log('Searching by keyword:', inputValue);
    } else {
      console.log('Searching by abstract:', inputValue);
    }
  };

  return (
    <div>   
    <div>
        <NavBar/>
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
        Search
      </button>
    </div>
    </div>
        <Footer/>
    </div>
  );
};

export default FindJournal;
