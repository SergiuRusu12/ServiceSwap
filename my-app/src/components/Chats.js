import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import "../components-css/Chats.css";

const Chats = () => {
  const { userId } = useParams();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize as true since data fetch starts immediately
  const navigate = useNavigate();

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
        setError(null); // Clear any previous errors on successful fetch
      } catch (error) {
        setError("Failed to load chats. Please try again later.");
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${userId}/${chatId}`);
  };

  return (
    <div className="chats-container">
      <Toolbar />
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading chats...</p>
      ) : (
        <div className="chat-list">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.chat_id}
                className="chat-entry"
                onClick={() => handleChatClick(chat.chat_id)}
              >
                <div className="chat-user">
                  {chat.Receiver ? chat.Receiver.username : "Unknown"}
                </div>
                <div className="chat-service">{chat.Service.title}</div>
                <div className="chat-timestamp">
                  {new Date(chat.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p>No chats available. Start a new conversation!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Chats;
