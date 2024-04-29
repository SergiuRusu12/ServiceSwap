// Chats.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "./Toolbar";
import "../components-css/Chats.css";
const Chats = () => {
  const { userId } = useParams();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/user/${userId}/chats`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (userId) {
      fetchChats();
    }
  }, [userId]);
  return (
    <div className="chats-container">
      <Toolbar />
      <h1 className="chats-heading">Chats for User ID: {userId}</h1>
      {error && <p>Error fetching chats: {error}</p>}
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.chat_id} className="chat-entry">
            <div className="chat-service">{chat.Service.title}</div>
            <div className="chat-timestamp">
              {new Date(chat.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
