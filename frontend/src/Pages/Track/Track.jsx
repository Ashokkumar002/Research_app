import React from 'react';
import './Track.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const Track = () => {
  // Example user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    lastLogin: '2024-12-19 10:00 AM',
  };

  const journals = [
    {
      id: 1,
      title: 'AI in Modern Healthcare',
      status: 'On Progress',
      remarks: '',
    },
    {
      id: 2,
      title: 'Blockchain for Data Security',
      status: 'Returned',
      remarks: 'Please add more references in the bibliography.',
    },
    {
      id: 3,
      title: 'Advances in Quantum Computing',
      status: 'Submitted',
      remarks: '',
    },
  ];

  return (
    <div>
      <div>
        <NavBar/>
    <div className="track-container">
      <div className="user-info">
        <h3>Welcome, {user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Last Login: {user.lastLogin}</p>
      </div>
      <h2>Track Your Journals</h2>
      <div className="track-card">
        {journals.map((journal) => (
          <div className="journal-card" key={journal.id}>
            <div className="journal-header">
              <h3>{journal.title}</h3>
              <span className={`status ${journal.status.replace(' ', '-').toLowerCase()}`}>
                {journal.status}
              </span>
            </div>
            <div className="journal-body">
              <p>
                <strong>Remarks:</strong> {journal.remarks || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Track;
