import express from "express";
import {
  getChats,
  getChatById,
  createChat,
  deleteChatById,
  updateChatById,
  getChatsByUserId,
} from "../DataAccess/ChatDA.js";
import Chat from "../Entities/Chat.js";
let chatRouter = express.Router();

chatRouter.post("/chats", async (req, res) => {
  return res.status(201).json(await createChat(req.body));
});

chatRouter.get("/chats", async (req, res) => {
  return res.json(await getChats());
});

chatRouter.get("/chats/:id", async (req, res) => {
  return res.json(await getChatById(req.params.id));
});

chatRouter.delete("/chats/:id", async (req, res) => {
  await deleteChatById(req.params.id);
  return res.status(204).send();
});

chatRouter.put("/chats/:id", async (req, res) => {
  let result = await updateChatById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Chat updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Chat not found" });
  }
});

chatRouter.get("/user/:userId/chats", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const chats = await getChatsByUserId(userId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

chatRouter.post("/chats/initiate", async (req, res) => {
  const { initiator_id, receiver_id, service_id } = req.body;
  try {
    const existingChat = await Chat.findOne({
      where: {
        initiator_id,
        receiver_id,
        service_id_fk: service_id,
      },
    });
    if (existingChat) {
      res.json(existingChat);
    } else {
      const newChat = await Chat.create({
        initiator_id,
        receiver_id,
        service_id_fk: service_id,
        timestamp: new Date(),
      });
      res.status(201).json(newChat);
    }
  } catch (error) {
    console.error("Failed to initiate chat:", error);
    res.status(500).json({ message: "Error initiating chat" });
  }
});

export default chatRouter;
