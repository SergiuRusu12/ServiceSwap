import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import "../components-css/Chats.css";

const Chats = () => {
  const { userId } = useParams();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchChats();
    }
  }, [userId]);

  const handleChatClick = (chatId) => {
    // Navigate to a detailed chat view or conversation page
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="chats-container">
      <Toolbar />
      <h1 className="chats-heading"></h1>
      {error && <p className="error-message">Error fetching chats: {error}</p>}
      {loading ? (
        <p>Loading chats...</p>
      ) : (
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.chat_id}
              className="chat-entry"
              onClick={() => handleChatClick(chat.chat_id)}
            >
              <div className="chat-service">{chat.Service.title}</div>
              <div className="chat-timestamp">
                {new Date(chat.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chats;
