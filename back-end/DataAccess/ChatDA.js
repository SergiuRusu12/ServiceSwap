import { Op } from "sequelize";
import User from "../Entities/Users.js";
import Services from "../Entities/Services.js";
import Chat from "../Entities/Chat.js";
import Sequelize from "sequelize";

async function getChats() {
  return await Chat.findAll();
}

async function getChatById(chat_id) {
  return await Chat.findByPk(chat_id);
}

async function createChat(chatData) {
  return await Chat.create(chatData);
}

async function deleteChatById(chat_id) {
  return await Chat.destroy({ where: { chat_id } });
}

async function updateChatById(chat_id, chatDetails) {
  return await Chat.update(chatDetails, { where: { chat_id } });
}

async function getChatsByUserId(userId) {
  try {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ initiator_id: userId }, { receiver_id: userId }],
      },
      include: [
        {
          model: User,
          as: "Receiver",
          attributes: ["username"],
        },
        {
          model: Services,
          attributes: ["title", "service_id"], // Include the 'id' attribute here
        },
      ],
      order: [["chat_id", "DESC"]],
    });
    return chats;
  } catch (error) {
    console.error("Error fetching chats by user ID:", error);
    throw new Error("Unable to fetch chats");
  }
}
async function updateChatTimestamp(chatId) {
  await Chat.update(
    {
      timestamp: Sequelize.fn("NOW"),
    },
    {
      where: { chat_id: chatId },
    }
  );
}
export {
  getChats,
  getChatById,
  createChat,
  deleteChatById,
  updateChatById,
  getChatsByUserId,
  updateChatTimestamp,
};
