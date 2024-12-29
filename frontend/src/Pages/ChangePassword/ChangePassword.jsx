import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./ChangePassword.css";

const ChangePassword = () => {
  const { user } = useContext(UserContext); // Access user details
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setErrorMessage("Both fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const response = await axios.put(
        "http://localhost:5000/api/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully!");
        navigate("/"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to change password. Try again."
      );
    }
  };

  return (
    <div className="change-password-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2>Change Password</h2>
      {user && (
        <div className="user-details">
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile_no}
          </p>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Enter your old password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
        />
      </div>
      <button className="change-password-button" onClick={handleChangePassword}>
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
