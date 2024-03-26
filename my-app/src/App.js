import React from "react";
import "./App.css";
import LoginSignup from "./components/LoginSignup";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        {/* Update this route to accept a hashed user ID */}
        <Route path="/main/:hashedUserID" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
