import React, { useEffect, useState } from "react";
import "../components-css/AdminTicketManagement.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminTicketManagement = () => {
  const [tickets, setTickets] = useState({ open: [], closed: [] });

  useEffect(() => {
    fetchTicketsAndDetails();
  }, []);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const fetchTicketsAndDetails = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/tickets");
      if (!res.ok) {
        throw new Error(`Failed to fetch tickets: ${res.status}`);
      }
      const ticketsData = await res.json();

      const ticketsWithDetails = await Promise.all(
        ticketsData.map(async (ticket) => {
          const userRes = await fetch(
            `http://localhost:9000/api/user/${ticket.ticket_creator_user_id_fk}`
          );
          const userData = await userRes.json();

          const orderRes = await fetch(
            `http://localhost:9000/api/order/${ticket.order_id_fk}`
          );
          const orderData = await orderRes.json();

          const targetUserForBan =
            ticket.ticket_creator_user_id_fk === orderData.buyer_fk_user_id
              ? orderData.seller_fk_user_id
              : orderData.buyer_fk_user_id;

          return {
            ...ticket,
            username: userData.username,
            orderDetails: orderData,
            targetUserForBan,
            actions: {
              closeOrder: false,
              makeServicePending: false,
              makeServiceInactive: false,
              banUser: false,
            },
          };
        })
      );

      const openTickets = ticketsWithDetails.filter(
        (ticket) => ticket.ticket_status === "Open"
      );
      const closedTickets = ticketsWithDetails.filter(
        (ticket) => ticket.ticket_status === "Closed"
      );
      setTickets({ open: openTickets, closed: closedTickets });
    } catch (error) {
      console.error("Failed to load tickets:", error);
    }
  };

  const handleActionSelection = async (ticket, index) => {
    try {
      if (ticket.actions.banUser) {
        await updateUserStatus(ticket.targetUserForBan);
      }

      if (ticket.actions.closeOrder) {
        await closeOrder(ticket.order_id_fk);
      }

      if (
        ticket.actions.makeServicePending ||
        ticket.actions.makeServiceInactive
      ) {
        const serviceStatus = ticket.actions.makeServicePending
          ? "Pending"
          : "Denied";
        await updateServiceStatus(
          ticket.orderDetails.service_fk_service_id,
          serviceStatus
        );
      }

      await closeTicket(ticket.ticket_id);
      fetchTicketsAndDetails();
    } catch (error) {
      console.error(error);
    }
  };
  async function updateUserStatus(userId) {
    const response = await fetch(
      `http://localhost:9000/api/user/${userId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_type: "banned" }),
      }
    );
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed to ban user: ${message}`);
    }
  }

  async function closeOrder(orderId) {
    const response = await fetch(
      `http://localhost:9000/api/order/${orderId}/statuss`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_status_buyer: "Closed",
          order_status_seller: "Closed",
        }),
      }
    );
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Failed to close order: ${message}`);
    }
  }

  async function updateServiceStatus(serviceId, status) {
    const response = await fetch(
      `http://localhost:9000/api/service/${serviceId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update service status");
    }
  }

  async function closeTicket(ticketId) {
    const response = await fetch(
      `http://localhost:9000/api/tickets/${ticketId}/close`,
      { method: "PATCH" }
    );
    if (!response.ok) {
      throw new Error("Failed to close ticket");
    }
  }

  const updateTicketActions = (index, action, value) => {
    const newTickets = { ...tickets };
    newTickets.open[index].actions[action] = value;
    setTickets(newTickets);
  };

  return (
    <div className="ticket-management-container">
      <button onClick={handleBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="tickets-section">
        <h2>Open Tickets</h2>
        <div className="tickets-list">
          {tickets.open.length > 0 ? (
            tickets.open.map((ticket, index) => (
              <div key={ticket.ticket_id} className="ticket">
                <h3>{ticket.ticket_title}</h3>
                <p>{ticket.ticket_message}</p>
                <p>Creator: {ticket.username}</p>
                <div>
                  <div
                    className="custom-checkbox"
                    onClick={() =>
                      updateTicketActions(
                        index,
                        "closeOrder",
                        !ticket.actions.closeOrder
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      id={`closeOrder-${ticket.ticket_id}`}
                      checked={ticket.actions.closeOrder}
                      onChange={(e) =>
                        updateTicketActions(
                          index,
                          "closeOrder",
                          e.target.checked
                        )
                      }
                    />
                    <span className="checkmark"></span>
                    <label htmlFor={`closeOrder-${ticket.ticket_id}`}>
                      Close Order
                    </label>
                  </div>
                  <div
                    className="custom-checkbox"
                    onClick={() =>
                      updateTicketActions(
                        index,
                        "makeServicePending",
                        !ticket.actions.makeServicePending
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      id={`makeServicePending-${ticket.ticket_id}`}
                      checked={ticket.actions.makeServicePending}
                      onChange={(e) =>
                        updateTicketActions(
                          index,
                          "makeServicePending",
                          e.target.checked
                        )
                      }
                    />
                    <span className="checkmark"></span>
                    <label htmlFor={`makeServicePending-${ticket.ticket_id}`}>
                      Set Service to Pending
                    </label>
                  </div>
                  <div
                    className="custom-checkbox"
                    onClick={() =>
                      updateTicketActions(
                        index,
                        "makeServiceInactive",
                        !ticket.actions.makeServiceInactive
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      id={`makeServiceInactive-${ticket.ticket_id}`}
                      checked={ticket.actions.makeServiceInactive}
                      onChange={(e) =>
                        updateTicketActions(
                          index,
                          "makeServiceInactive",
                          e.target.checked
                        )
                      }
                    />
                    <span className="checkmark"></span>
                    <label htmlFor={`makeServiceInactive-${ticket.ticket_id}`}>
                      Set Service to Denied
                    </label>
                  </div>
                  <div
                    className="custom-checkbox"
                    onClick={() =>
                      updateTicketActions(
                        index,
                        "banUser",
                        !ticket.actions.banUser
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      id={`banUser-${ticket.ticket_id}`}
                      checked={ticket.actions.banUser}
                      onChange={(e) =>
                        updateTicketActions(index, "banUser", e.target.checked)
                      }
                    />
                    <span className="checkmark"></span>
                    <label htmlFor={`banUser-${ticket.ticket_id}`}>
                      Ban User
                    </label>
                  </div>
                </div>
                <button onClick={() => handleActionSelection(ticket, index)}>
                  Close Ticket
                </button>
              </div>
            ))
          ) : (
            <p>No open tickets.</p>
          )}
        </div>
      </div>
      <div className="tickets-section">
        <h2>Closed Tickets</h2>
        <div className="tickets-list">
          {tickets.closed.length > 0 ? (
            tickets.closed.map((ticket) => (
              <div key={ticket.ticket_id} className="ticket">
                <h3>{ticket.ticket_title}</h3>
                <p>{ticket.ticket_message}</p>
                <p>Creator: {ticket.username}</p>
              </div>
            ))
          ) : (
            <p>No closed tickets.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTicketManagement;
