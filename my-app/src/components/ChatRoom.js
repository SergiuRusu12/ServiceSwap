import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ChatRoom.css";
import Toolbar from "./Toolbar.js";
import ChatSidebar from "./ChatSideBar.js";
import OrderRequestModal from "./OrderRequestModal.js"; // Import your Modal component once created

function ChatRoom() {
  const { chatId, serviceId } = useParams();
  const userId = parseInt(useParams().userId, 10);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isBuyer, setIsBuyer] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
  }, [messages]);

  useEffect(() => {
    fetch(`http://localhost:9000/api/chats/${chatId}`)
      .then((response) => response.json())
      .then((data) => {
        setIsBuyer(data.initiator_id === userId);
      })
      .catch((error) => {
        console.error("Error fetching chat details:", error);
        setError("Failed to load chat details. Please try again later.");
        setLoading(false);
      });
  }, [chatId, userId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageToSend = {
      chat_id_fk: chatId,
      sender_id: userId,
      service_id_fk: serviceId,
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

  const handleOrderInitiation = () => {
    setShowModal(true); // Shows the modal for order confirmation
  };

  const handleConfirmOrder = () => {
    console.log("Order confirmed");
    // Here, add the function to initiate the order to your backend
    setShowModal(false); // Close modal after confirmation
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
            {isBuyer && (
              <button onClick={handleOrderInitiation}>Initiate Order</button>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <OrderRequestModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmOrder}
        />
      )}
    </>
  );
}

export default ChatRoom;
