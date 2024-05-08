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

// Assuming Sequelize or a similar ORM
async function updateTicketById(ticketId, updateParams) {
  try {
    const ticket = await Tickets.findByPk(ticketId);
    if (!ticket) {
      return false;
    }
    await ticket.update(updateParams);
    return true;
  } catch (error) {
    console.error("Error updating ticket:", error);
    return false;
  }
}

export {
  getTickets,
  getTicketById,
  createTicket,
  deleteTicketById,
  updateTicketById,
};
