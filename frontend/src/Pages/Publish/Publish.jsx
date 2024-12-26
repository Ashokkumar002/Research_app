import React, { useState } from 'react';
import './Publish.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const Publish = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journalName: '',
    abstract: '',
    file: null, // Added file field
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage('');
    setError('');

    // Check if file is provided
    if (!formData.file) {
      setError('Please upload a journal file.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('authors', formData.authors.split(',').map((author) => author.trim())); // Convert to array
    formDataToSend.append('journalName', formData.journalName);
    formDataToSend.append('abstract', formData.abstract);
    formDataToSend.append('file', formData.file); // Append the file

    try {
      const response = await fetch('http://localhost:5000/api/publications', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to publish the journal. Please try again.');
      }

      const data = await response.json();
      setMessage('Journal is submitted for publication');
      setFormData({
        title: '',
        authors: '',
        journalName: '',
        abstract: '',
        file: null,
      });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="publish-container">
        <h2>Publish a Journal</h2>
        <form onSubmit={handleSubmit} className="publish-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="authors">Authors (comma-separated):</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            required
          />

          <label htmlFor="journalName">Journal Name:</label>
          <input
            type="text"
            id="journalName"
            name="journalName"
            value={formData.journalName}
            onChange={handleChange}
            required
          />

          <label htmlFor="abstract">Abstract:</label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="file">Upload Journal File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
          />

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {/* Success or Error Message */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Publish;


