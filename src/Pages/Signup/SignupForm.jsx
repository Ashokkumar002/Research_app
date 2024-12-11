import React from 'react';
import './SignupForm.css';

const SignupForm = () => {
  return (
    <div className="signup-container">
      <div className="background"></div>
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
              placeholder="gmail.com"
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
      </div>
      <button className="sign-in-button">Sign In</button>
    </div>
  );
};

export default SignupForm;
