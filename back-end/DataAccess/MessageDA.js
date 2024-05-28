import Message from "../Entities/Messages.js";

async function getMessagesByChatId(chat_id) {
  try {
    const messages = await Message.findAll({
      where: { chat_id_fk: chat_id },
      order: [["timestamp", "ASC"]],
    });

    return messages;
  } catch (error) {
    console.error("Error in getMessagesByChatId:", error);
    throw error;
  }
}

async function createMessage(data) {
  return await Message.create(data);
}

async function deleteMessageById(message_id) {
  return await Message.destroy({ where: { message_id } });
}

export { getMessagesByChatId, createMessage, deleteMessageById };
