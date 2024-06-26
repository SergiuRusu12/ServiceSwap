import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";

import { useParams } from "react-router-dom";
import "../components-css/ChatRoom.css";
import Toolbar from "./Toolbar.js";
import ChatSidebar from "./ChatSideBar.js";
import OrderRequestModal from "./OrderRequestModal.js";

function ChatRoom() {
  const { chatId, serviceId } = useParams();
  const userId = parseInt(useParams().userId, 10);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isBuyer, setIsBuyer] = useState(false);
  const [sellerId, setSellerId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

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
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const chatResponse = await fetch(
          `http://localhost:9000/api/chats/${chatId}`
        );
        const chatData = await chatResponse.json();
        setIsBuyer(chatData.initiator_id === userId);
        setSellerId(chatData.receiver_id);

        const orderResponse = await fetch(
          `http://localhost:9000/api/orders/byChat/${chatId}`
        );
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          setOrderDetails(orderData);
        } else {
          setOrderDetails(null);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to load details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [chatId, userId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageToSend = {
      chat_id_fk: Number(chatId),
      sender_id: Number(userId),
      service_id_fk: Number(serviceId),
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
    setShowModal(true);
  };

  const handleConfirmOrder = (selectedCategory) => {
    console.log("Order confirmed with service in exchange:", selectedCategory);

    setShowModal(false);
    navigate(0);
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
            {isBuyer && !orderDetails && (
              <button onClick={handleOrderInitiation}>Initiate Order</button>
            )}
            {!isBuyer &&
              orderDetails &&
              orderDetails[0].order_status_seller === "Pending" && (
                <button onClick={() => setShowModal(true)}>
                  Respond to Order
                </button>
              )}
          </div>
        </div>
      </div>
      {showModal && (
        <OrderRequestModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmOrder}
          serviceId={serviceId}
          userId={userId}
          sellerId={sellerId}
          chatId={chatId}
          isBuyer={isBuyer}
          orderDetails={orderDetails}
        />
      )}
    </>
  );
}

export default ChatRoom;
