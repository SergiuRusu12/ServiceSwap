import Tickets from "../Entities/Tickets.js";

async function getTickets() {
  return await Tickets.findAll();
}

async function getTicketById(ticket_id) {
  return await Tickets.findByPk(ticket_id);
}

async function createTicket(ticket) {
  return await Tickets.create(ticket);
}

async function deleteTicketById(ticket_id) {
  return await Tickets.destroy({ where: { ticket_id } });
}

async function updateTicketById(ticket_id, ticketDetails) {
  return await Tickets.update(ticketDetails, { where: { ticket_id } });
}

export {
  getTickets,
  getTicketById,
  createTicket,
  deleteTicketById,
  updateTicketById,
};
