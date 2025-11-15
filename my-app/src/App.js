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
import AdminDashboard from "./components/AdminDashboard";
import AdminServiceApproval from "./components/AdminServiceApproval";
import AdminTicketManagement from "./components/AdminTicketManagement";

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/adminServiceApproval"
          element={<AdminServiceApproval />}
        />
        <Route
          path="/adminTicketManagement"
          element={<AdminTicketManagement />}
        />
      </Routes>
    </Router>
  );
}

export default App;
