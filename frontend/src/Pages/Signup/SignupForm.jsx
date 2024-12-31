import React, { useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ) {
      setError("Please fill out all fields and agree to the terms");
      return;
    }

    try {
      const response = await fetch(
        "https://automated-journal-finder.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
            mobile_no: formData.mobile,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Redirect on success
        navigate("/SignInForm");
      } else {
        setError(data.message || "Something went wrong, please try again");
      }
    } catch (error) {
      setError("Error during registration: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="form-container">
        <h1 className="form-title">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="1234567890"
              maxLength="15"
              pattern="[0-9]+"
              title="Please enter a valid mobile number with digits only"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Create an Account
          </button>
        </form>
        <p className="signup-prompt">
          Already have an account?{" "}
          <a href="/SignInForm" className="signin-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
