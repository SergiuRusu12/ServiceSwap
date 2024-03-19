// messagesChatRouter.js

import express from "express";
import {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessageById,
  updateMessageById,
} from "../DataAccess/MessagesChatDA.js";

let messagesChatRouter = express.Router();

// Route to create a new message
messagesChatRouter.post("/message", async (req, res) => {
  return res.status(201).json(await createMessage(req.body));
});

// Route to get all messages
messagesChatRouter.get("/messages", async (req, res) => {
  return res.json(await getMessages());
});

// Route to get a message by ID
messagesChatRouter.get("/message/:id", async (req, res) => {
  return res.json(await getMessageById(req.params.id));
});

// Optionally, if your application requires these operations:
// Route to delete a message by ID
messagesChatRouter.delete("/message/:id", async (req, res) => {
  await deleteMessageById(req.params.id);
  return res.status(204).send(); // No content to send back
});

// Route to update a message by ID
messagesChatRouter.put("/message/:id", async (req, res) => {
  let result = await updateMessageById(req.params.id, req.body);
  if (result[0]) {
    // Check if any rows were updated
    return res.status(200).json({ message: "Message updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Message not found" });
  }
});

export default messagesChatRouter;
