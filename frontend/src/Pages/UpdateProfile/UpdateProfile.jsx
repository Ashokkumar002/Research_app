import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext); // Access user data and setUser function
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobileNo, setMobileNo] = useState(user?.mobile_no || "");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    if (!username || !email || !mobileNo) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const response = await axios.put(
        "https://automated-journal-finder.onrender.com/api/users/update-profile",
        { username, email, mobile_no: mobileNo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setUser(response.data.user); // Update user context with new data
        navigate("/"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update profile. Try again."
      );
    }
  };

  return (
    <div className="update-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2>Update Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNo">Mobile Number:</label>
        <input
          type="text"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          placeholder="Enter your mobile number"
        />
      </div>
      <button className="update-profile-button" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
};

export default UpdateProfile;
