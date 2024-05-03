import React from "react";
import "./App.css";
import LoginSignup from "./components/LoginSignup";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ServicePage } from "./components/ServicePage";
import ProfilePage from "./components/ProfilePage";
import Chats from "./components/Chats";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/main/:hashedUserID" element={<MainPage />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/chats/:userId" element={<Chats />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
        <Route path="/chat/:userId/:chatId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
