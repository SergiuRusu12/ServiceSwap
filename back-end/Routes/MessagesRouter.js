import express from "express";
import {
  getMessagesByChatId,
  createMessage,
  deleteMessageById,
} from "../DataAccess/MessageDA.js";
import { updateChatTimestamp } from "../DataAccess/ChatDA.js";

let messageRouter = express.Router();

messageRouter.get("/chats/:chatId/messages", async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId, 10);
    const messages = await getMessagesByChatId(chatId);
    res.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new message
messageRouter.post("/messages", async (req, res) => {
  const { chat_id_fk, sender_id, service_id_fk, message_content } = req.body;
  if (!chat_id_fk || !sender_id || !message_content) {
    return res.status(400).json({ error: "Missing required message fields." });
  }
  try {
    const message = await createMessage({
      chat_id_fk,
      sender_id,
      service_id_fk, // Ensure this is correctly extracted
      message_content,
    });

    await updateChatTimestamp(chat_id_fk);

    res.status(201).json(message);
  } catch (error) {
    console.error("Failed to create message:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a message
messageRouter.delete("/messages/:messageId", async (req, res) => {
  try {
    const messageId = parseInt(req.params.messageId, 10);
    await deleteMessageById(messageId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default messageRouter;
