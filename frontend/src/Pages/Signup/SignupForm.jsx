import React from 'react';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-container">
      <div className="background"></div>

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate(-1)} // Navigate to the previous page
      >
        &larr; Back
      </button>

      <div className="form-container">
        <h1 className="form-title">Sign up</h1>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your name"
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
              maxLength="15" // Limit the maximum length
              pattern="[0-9]+" // Allow only numeric values
              title="Please enter a valid mobile number with digits only"
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
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </label>
          </div>
          <button type="submit" className="submit-button">
            Create an Account
          </button>
        </form>
        <p className="signup-prompt">
          Already have an account?{' '}
          <a href="/SignInForm" className="signin-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

