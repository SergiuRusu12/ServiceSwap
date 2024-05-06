import express from "express";
import {
  getTickets,
  getTicketById,
  createTicket,
  deleteTicketById,
  updateTicketById,
} from "../DataAccess/TicketsDA.js";

let ticketsRouter = express.Router();

ticketsRouter.post("/tickets", async (req, res) => {
  return res.status(201).json(await createTicket(req.body));
});

ticketsRouter.get("/tickets", async (req, res) => {
  return res.json(await getTickets());
});

ticketsRouter.get("/tickets/:id", async (req, res) => {
  return res.json(await getTicketById(req.params.id));
});

ticketsRouter.delete("/tickets/:id", async (req, res) => {
  await deleteTicketById(req.params.id);
  return res.status(204).send();
});

ticketsRouter.put("/tickets/:id", async (req, res) => {
  let result = await updateTicketById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Ticket updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Ticket not found" });
  }
});

export default ticketsRouter;
