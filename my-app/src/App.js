import React from "react";
import "./App.css";
import LoginSignup from "./components/LoginSignup";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ServicePage } from "./components/ServicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/main/:hashedUserID" element={<MainPage />} />
        {/* Add the new route for ServicePage */}
        <Route path="/service/:serviceId" element={<ServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
