import Message from "../Entities/Messages.js";

async function getMessagesByChatId(chat_id) {
  try {
    // console.log("Fetching messages for chat ID:", chat_id);
    const messages = await Message.findAll({
      where: { chat_id_fk: chat_id },
      order: [["timestamp", "ASC"]],
    });
    //console.log("Messages fetched:", messages);
    return messages;
  } catch (error) {
    console.error("Error in getMessagesByChatId:", error);
    throw error; // Or handle it as needed
  }
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
