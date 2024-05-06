import React from "react";
import "./App.css";
import LoginSignup from "./components/LoginSignup";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ServicePage } from "./components/ServicePage";
import ProfilePage from "./components/ProfilePage";
import Chats from "./components/Chats";
import ChatRoom from "./components/ChatRoom";
import Orders from "./components/Orders";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/main/:hashedUserID" element={<MainPage />} />
        <Route
          path="/service/:serviceId/:initiatorIds"
          element={<ServicePage />}
        />
        <Route path="/chats/:userId" element={<Chats />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
        <Route path="/chat/:userId/:chatId/:serviceId" element={<ChatRoom />} />
        <Route path="/orders/:userId" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
