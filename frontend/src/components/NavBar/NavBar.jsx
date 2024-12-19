import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const headerStyle = {
    backgroundColor: "#004b87",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "20px",
  };

  const navLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "color 0.3s",
  };

  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "auto",
  };

  return (
    <header style={headerStyle}>
      <h1>Journal Finder</h1>
      <nav style={navLinksStyle}>
        <Link to="/find-journal" style={navLinkStyle}>
          Find a Journal
        </Link>
        <Link to="/publish" style={navLinkStyle}>
          Publish with Us
        </Link>
        <Link to="/track" style={navLinkStyle}>
          Track Your Research
        </Link>
      </nav>
      <div style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search journals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#ffa500",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert(`Searching for: ${searchQuery}`)}
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default NavBar;
