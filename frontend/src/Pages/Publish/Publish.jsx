import React, { useState } from 'react';
import './Publish.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const Publish = () => {
  const [formData, setFormData] = useState({
    orchidId: '',
    authorName: '',
    abstract: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form Submitted!');
  };

  return (
    <div>   
    <div>
        <NavBar/>
    <div className="publish-container">
        
      <h2>Journal Publishing</h2>
      <form onSubmit={handleSubmit} className="publish-form">
        <label htmlFor="orchidId">ORCID ID:</label>
        <input
          type="text"
          id="orchidId"
          name="orchidId"
          value={formData.orchidId}
          onChange={handleChange}
          required
        />

        <label htmlFor="authorName">Author Name:</label>
        <input
          type="text"
          id="authorName"
          name="authorName"
          value={formData.authorName}
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

        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
    
        <Footer/>
    </div>
  );
};

export default Publish;
