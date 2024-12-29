import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import SignInForm from "./Pages/Signin/SignInForm";
import SignupForm from "./Pages/Signup/SignupForm";
import Track from "./Pages/Track/Track";
import Publish from "./Pages/Publish/Publish";
import FindJournal from "./Pages/FindJournal/FindJournal";
import AdminDashboard from "./Pages/admindashbord/AdminDashboard";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/track" element={<Track />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/findJournal" element={<FindJournal />} />
      <Route path="/SignInForm" element={<SignInForm />} />
      <Route path="/SignupForm" element={<SignupForm />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="/UpdateProfile" element={<UpdateProfile />} />
    </Routes>
  );
};

export default App;
