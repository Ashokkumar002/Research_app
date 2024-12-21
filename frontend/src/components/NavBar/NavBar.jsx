import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import the CSS file

const NavBar = () => {
  return (
    <header className="navbar-header">
      <h1 className="navbar-title">Journal Finder</h1>
      <nav className="navbar-links">
        <Link to="/find-journal" className="navbar-link">
          Find a Journal
        </Link>
        <Link to="/publish" className="navbar-link">
          Publish with Us
        </Link>
        <Link to="/track" className="navbar-link">
          Track Your Research
        </Link>
      </nav>
      <div className="navbar-buttons">
        <Link to="/SignInForm" className="navbar-button">
          Sign In
        </Link>
        <Link to="/SignupForm" className="navbar-button navbar-button-signup">
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default NavBar;

