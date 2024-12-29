import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext"; // Import UserContext
import "./NavBar.css"; // Import the CSS file

const NavBar = () => {
  const { user, logout } = useContext(UserContext); // Access user data and logout function
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State to toggle the dropdown menu
  const navigate = useNavigate(); // For redirection after account deletion
  const profileMenuRef = useRef(null); // Reference to the profile menu

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.delete(
          `http://localhost:5000/api/users/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          alert("Account successfully deleted.");
          logout(); // Clear user state
          navigate("/"); // Redirect to the home page
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  const calculateMenuWidth = () => {
    const prefixLengths = {
      username: "Name: ".length,
      email: "Email: ".length,
      mobile_no: "Mobile: ".length,
    };

    // Get the longest combined prefix + value length
    const maxLength = Math.max(
      user.username ? prefixLengths.username + user.username.length : 0,
      user.email ? prefixLengths.email + user.email.length : 0,
      user.mobile_no ? prefixLengths.mobile_no + user.mobile_no.length : 0
    );

    return Math.max(200, maxLength * 10); // Minimum width of 200px
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false); // Close the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar-header">
      <h1 className="navbar-title">Journal Finder</h1>
      <nav className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/findJournal" className="navbar-link">
          Find a Journal
        </Link>
        {user ? (
          <Link to="/publish" className="navbar-link">
            Publish with Us
          </Link>
        ) : (
          <Link to="/SignInForm" className="navbar-link">
            Publish with Us
          </Link>
        )}
        {user ? (
          <Link to="/track" className="navbar-link">
            Track Your Research
          </Link>
        ) : (
          <Link to="/SignInForm" className="navbar-link">
            Track Your Research
          </Link>
        )}
        {user?.role === "admin" && (
          <Link to="/AdminDashboard" className="navbar-link">
            Admin
          </Link>
        )}
      </nav>
      <div className="navbar-buttons">
        {!user ? (
          <Link to="/SignInForm" className="navbar-button">
            Sign In
          </Link>
        ) : (
          <div
            className="user-profile"
            style={{ position: "relative" }}
            ref={profileMenuRef} // Attach the ref to the profile menu container
          >
            <button
              className="profile-button"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                src={
                  user.profileImage ||
                  "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                }
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <span>{user.username}</span>
            </button>
            {showProfileMenu && (
              <div
                className="profile-menu"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  width: `${calculateMenuWidth()}px`,
                }}
              >
                <div style={{ padding: "10px", color: "black" }}>
                  {user.username && (
                    <p style={{ marginBottom: "10px" }}>
                      <strong>Name: {user.username}</strong>
                    </p>
                  )}
                  {user.email && (
                    <p style={{ marginBottom: "10px" }}>Email: {user.email}</p>
                  )}
                  {user.mobile_no && (
                    <p style={{ marginBottom: "10px" }}>
                      Mobile: {user.mobile_no}
                    </p>
                  )}
                  <hr />
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onClick={() => navigate("/UpdateProfile")}
                  >
                    Update Profile
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onClick={() => navigate("/ChangePassword")}
                  >
                    Change Password
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "red",
                    }}
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
