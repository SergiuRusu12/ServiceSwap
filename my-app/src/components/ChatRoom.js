import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ChatRoom.css";
import Toolbar from "./Toolbar.js";
import ChatSidebar from "./ChatSideBar.js";

function ChatRoom() {
  const { chatId } = useParams();
  const userId = parseInt(useParams().userId, 10);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);

  const fetchMessages = useCallback(() => {
    fetch(`http://localhost:9000/api/chats/${chatId}/messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setError("Failed to load messages. Please try again later.");
        setLoading(false);
      });
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Scroll to bottom every time messages update

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageToSend = {
      chat_id_fk: chatId,
      sender_id: userId,
      message_content: newMessage.trim(),
    };
    fetch("http://localhost:9000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageToSend),
    })
      .then((response) => response.json())
      .then((message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
      })
      .catch((err) => setError("Failed to send message."));
  };

  return (
    <>
      <Toolbar />
      <div className="chat-layout">
        <ChatSidebar userId={userId} />
        <div className="chat-room">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.message_id}
                  className={`message ${
                    message.sender_id === userId ? "sent" : "received"
                  }`}
                >
                  {message.message_content}
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          )}
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              autoFocus
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
