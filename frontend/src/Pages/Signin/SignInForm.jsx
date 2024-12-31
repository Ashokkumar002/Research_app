import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext"; // Adjust the path as necessary
import "./SignInForm.css";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext); // Access setUser from context
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

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(
        "https://automated-journal-finder.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save JWT token to localStorage
        localStorage.setItem("token", data.token);
        console.log(data);
        // Update the user context
        setUser(data.user);

        // Redirect to another page (e.g., dashboard or home)
        navigate("/"); // Modify the URL as needed
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Error during login: " + error.message);
    }
  };

  return (
    <div className="signin-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="form-container">
        <h1 className="form-title">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              value={formData.email}
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
            Proceed
          </button>
        </form>
        <p className="signup-prompt">
          Don't have an account?{" "}
          <Link to="/SignUpForm" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
