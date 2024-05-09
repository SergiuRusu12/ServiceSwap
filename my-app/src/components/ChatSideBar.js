import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ChatSidebar({ userId }) {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9000/api/user/${userId}/chats`)
      .then((response) => response.json())
      .then((data) => {
        const sortedChats = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setChats(sortedChats);
      })
      .catch((error) => console.error("Failed to load chats:", error));
  }, [userId]);

  return (
    <div className="chat-sidebar">
      <h2>Chats</h2>
      {chats.map((chat) => (
        <div
          key={chat.chat_id}
          className="chat-entry"
          onClick={() =>
            navigate(`/chat/${userId}/${chat.chat_id}/${chat.service_id_fk}`)
          }
        >
          <div>{chat.Service.title}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatSidebar;
