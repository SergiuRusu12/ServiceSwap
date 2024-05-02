import Message from "../Entities/Messages.js";

// Get all messages in a chat
async function getMessagesByChatId(chat_id) {
  return await Message.findAll({
    where: { chat_id_fk: chat_id },
    order: [["timestamp", "ASC"]],
  });
}

// Create a new message
async function createMessage(data) {
  return await Message.create(data);
}

// Delete a message by ID
async function deleteMessageById(message_id) {
  return await Message.destroy({ where: { message_id } });
}

export { getMessagesByChatId, createMessage, deleteMessageById };
