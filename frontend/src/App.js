import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import SignInForm from "./Pages/Signin/SignInForm";
import SignupForm from "./Pages/Signup/SignupForm";
import Track from "./Pages/Track/Track";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/track-goals" element={<Track />} />
    </Routes>
  );
};

export default App;
