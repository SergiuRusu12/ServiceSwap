import { Op } from "sequelize"; // Make sure to import the Op operator
import User from "../Entities/Users.js"; // Import the User model
import Services from "../Entities/Services.js"; // Import the Services model
import MessagesChat from "../Entities/MessagesChat.js";

// Function to get all messages
async function getMessages() {
  return await MessagesChat.findAll();
}

// Function to get a message by ID
async function getMessageById(chat_id) {
  return await MessagesChat.findByPk(chat_id);
}

// Function to create a new message
async function createMessage(message) {
  return await MessagesChat.create(message);
}

// Optionally, if your application requires deleting or updating messages:
// Function to delete a message by ID
async function deleteMessageById(chat_id) {
  return await MessagesChat.destroy({ where: { chat_id } });
}

// Function to update a message by ID
async function updateMessageById(chat_id, messageDetails) {
  return await MessagesChat.update(messageDetails, { where: { chat_id } });
}
async function getChatsByUserId(userId) {
  try {
    const chats = await MessagesChat.findAll({
      where: {
        [Op.or]: [
          { sender_fk_user_id: userId },
          { receiver_fk_user_id: userId },
        ],
      },
      include: [
        {
          model: User,
          as: "Receiver", // This alias must match the alias used in your Sequelize associations
          attributes: ["username"],
        },
        {
          model: Services,
          attributes: ["title"],
        },
      ],
      order: [["timestamp", "DESC"]],
    });
    return chats;
  } catch (error) {
    console.error("Error fetching chats by user ID:", error);
    throw new Error("Unable to fetch chats");
  }
}

export {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessageById,
  updateMessageById,
  getChatsByUserId,
};
