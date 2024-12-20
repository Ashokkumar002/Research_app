import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy;  ©{currentYear} Journal Finder. All Rights Reserved.</p>
    
      </div>
    </footer>
  );
};

export default Footer;
