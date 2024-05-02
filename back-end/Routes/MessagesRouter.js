import express from "express";
import {
  getMessagesByChatId,
  createMessage,
  deleteMessageById,
} from "../DataAccess/MessageDA.js";

const messageRouter = express.Router();

// Route to get all messages for a specific chat
messageRouter.get("/chats/:chatId/messages", async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId, 10);
    const messages = await getMessagesByChatId(chatId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new message
messageRouter.post("/messages", async (req, res) => {
  try {
    const message = await createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
