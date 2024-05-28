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

ticketsRouter.patch("/tickets/:id/close", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const result = await updateTicketById(ticketId, {
      ticket_status: "Closed",
    });
    if (result) {
      res.status(200).json({ message: "Ticket closed successfully" });
    } else {
      res.status(404).json({ error: true, message: "Ticket not found" });
    }
  } catch (error) {
    console.error("Failed to close the ticket:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
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

ticketsRouter.put("/tickets/:id/close", async (req, res) => {
  try {
    const result = await updateTicketById(req.params.id, { status: "Closed" });
    if (result[0]) {
      res.status(200).json({ message: "Ticket closed successfully" });
    } else {
      res.status(404).json({ error: true, message: "Ticket not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Failed to close the ticket" });
  }
});

export default ticketsRouter;
