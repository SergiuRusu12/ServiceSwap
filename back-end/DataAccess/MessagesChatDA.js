// MessagesChatDA.js

import MessagesChat from "../Entities/MessagesChat.js";

// Function to get all messages
async function getMessages() {
  return await MessagesChat.findAll();
}

// Function to get a message by ID
async function getMessageById(msg_id) {
  return await MessagesChat.findByPk(msg_id);
}

// Function to create a new message
async function createMessage(message) {
  return await MessagesChat.create(message);
}

// Optionally, if your application requires deleting or updating messages:
// Function to delete a message by ID
async function deleteMessageById(msg_id) {
  return await MessagesChat.destroy({ where: { msg_id } });
}

// Function to update a message by ID
async function updateMessageById(msg_id, messageDetails) {
  return await MessagesChat.update(messageDetails, { where: { msg_id } });
}

export {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessageById,
  updateMessageById,
};
