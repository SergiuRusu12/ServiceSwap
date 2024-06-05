import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components-css/Orders.css";
import Toolbar from "./Toolbar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Orders = () => {
  const { userId } = useParams();
  const [buyerOrders, setBuyerOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentOrderToMark, setCurrentOrderToMark] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [formError, setFormError] = useState("");
  const [rating, setRating] = useState(5);
  const [partiallyCompletedOrders, setPartiallyCompletedOrders] = useState([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    InProgress: 0,
    Completed: 0,
    Pending: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/orders/user/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const ordersWithServices = await Promise.all(
          data.buyerOrders.concat(data.sellerOrders).map(async (order) => {
            const serviceResponse = await fetch(
              `http://localhost:9000/api/service/${order.service_fk_service_id}`
            );
            const serviceData = await serviceResponse.json();
            return { ...order, serviceName: serviceData.title };
          })
        );

        setBuyerOrders(
          ordersWithServices.filter(
            (order) =>
              order.buyer_fk_user_id === parseInt(userId) &&
              order.order_status_buyer === "InProgress" &&
              order.order_status_seller !== "Completed" &&
              order.order_status_seller !== "Pending"
          )
        );

        setSellerOrders(
          ordersWithServices.filter(
            (order) =>
              order.seller_fk_user_id === parseInt(userId) &&
              order.order_status_seller === "InProgress" &&
              order.order_status_buyer !== "Completed" &&
              order.order_status_buyer !== "Pending"
          )
        );

        setPartiallyCompletedOrders(
          ordersWithServices.filter(
            (order) =>
              (order.buyer_fk_user_id === parseInt(userId) &&
                order.order_status_seller === "Completed" &&
                order.order_status_buyer !== "Completed" &&
                order.order_status_buyer !== "Pending") ||
              (order.seller_fk_user_id === parseInt(userId) &&
                order.order_status_buyer === "Completed" &&
                order.order_status_seller !== "Completed" &&
                order.order_status_seller !== "Pending")
          )
        );

        setCompletedOrders(
          ordersWithServices.filter(
            (order) =>
              order.order_status_buyer === "Completed" &&
              order.order_status_seller === "Completed"
          )
        );
        setError(null);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);
    return category ? category.category_name : "Not specified";
  };
  const handleMarkAsDone = (order) => {
    setCurrentOrderToMark(order);
    setShowModal(true);
  };

  const confirmMarkAsDone = () => {
    if (!currentOrderToMark) return;

    const updateStatusUrl = `http://localhost:9000/api/order/${currentOrderToMark.order_id}/status`;
    const body = {
      userId: parseInt(userId),
      status: "Completed",
      role:
        currentOrderToMark.buyer_fk_user_id === parseInt(userId)
          ? "seller"
          : "buyer",
    };

    fetch(updateStatusUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order status updated:", data);
        const review = {
          order_fk_order_id: currentOrderToMark.order_id,
          rating: rating,
        };
        return fetch("http://localhost:9000/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
        });
      })
      .then((reviewResponse) => reviewResponse.json())
      .then((reviewData) => {
        console.log("Review posted:", reviewData);
        setShowModal(false);
        navigate(0);
      })
      .catch((error) => {
        console.error("Failed to update order status or post review:", error);
      });
  };

  const handleCreateReport = (orderId) => {
    setCurrentOrderId(orderId);
    setShowReportModal(true);
  };

  const handleReportChange = (setter) => (event) => {
    setter(event.target.value);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/orders/user/${userId}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        calculateStatusCounts(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const calculateStatusCounts = (orders) => {
    const initialCounts = { InProgress: 0, Completed: 0, Pending: 0 };

    const statusCounts = orders.buyerOrders.concat(orders.sellerOrders).reduce(
      (acc, order) => {
        const buyerStatus = order.order_status_buyer;
        const sellerStatus = order.order_status_seller;

        if (buyerStatus === "Completed" && sellerStatus === "Completed") {
          acc.Completed += 1;
        } else if (
          (buyerStatus === "Completed" && sellerStatus !== "Completed") ||
          (sellerStatus === "Completed" && buyerStatus !== "Completed")
        ) {
          acc.Pending += 1;
        } else {
          acc.InProgress += 1;
        }

        return acc;
      },
      { ...initialCounts }
    );

    setOrderStatusCounts(statusCounts);
  };

  const orderStatusChartData = {
    labels: ["InProgress", "Completed", "Pending"],
    datasets: [
      {
        label: "Order Statuses",
        data: [
          orderStatusCounts.InProgress,
          orderStatusCounts.Completed,
          orderStatusCounts.Pending,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.8)", // InProgress
          "rgba(75, 192, 192, 0.8)", // Completed
          "rgba(255, 99, 132, 0.8)", // Pending
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Order Status Overview",
        },
      },
    },
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Order Status Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const submitReport = () => {
    setFormError("");

    // Validation checks
    if (!reportTitle || reportTitle.length < 5) {
      setFormError("Title must be at least 5 characters long.");
      return;
    }
    if (!reportMessage || reportMessage.length < 15) {
      setFormError("Message must be at least 15 characters long.");
      return;
    }

    const ticket = {
      ticket_title: reportTitle,
      ticket_message: reportMessage,
      ticket_status: "Open",
      ticket_creator_user_id_fk: parseInt(userId),
      order_id_fk: currentOrderId,
    };

    fetch("http://localhost:9000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to create ticket");
        return response.json();
      })
      .then((data) => {
        console.log("Ticket created:", data);

        const updateOrderStatus = async () => {
          const statuses = ["buyer", "seller"];
          for (const role of statuses) {
            const updateOrderUrl = `http://localhost:9000/api/order/${currentOrderId}/status`;
            await fetch(updateOrderUrl, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: parseInt(userId),
                status: "Closed",
                role,
              }),
            }).then((response) => {
              if (!response.ok)
                throw new Error(`Failed to update ${role} status`);
            });
          }
        };

        return updateOrderStatus();
      })
      .then(() => {
        console.log(
          "Order status updated to 'Closed' for both buyer and seller"
        );
        setShowReportModal(false);
        setReportTitle("");
        setReportMessage("");
        navigate(0);
      })
      .catch((error) => {
        console.error("Failed to process your request:", error);
        setFormError("Failed to create ticket: " + error.message);
      });
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Toolbar></Toolbar>
      <div className="orders-container">
        <h1>Your Orders</h1>
        <Bar data={orderStatusChartData} options={chartOptions} />

        <div className="role-section">
          <h2>As Buyer</h2>
          {buyerOrders.length > 0 ? (
            buyerOrders.map((order) => (
              <div key={order.order_id} className="order-entry">
                <p className="order-details">Service: {order.serviceName}</p>
                <p className="order-details">
                  Exchanging with:{" "}
                  {getCategoryNameById(order.service_in_exchange_id)}
                </p>
                <div className="order-actions">
                  <button onClick={() => handleMarkAsDone(order)}>
                    Mark as Done
                  </button>
                  <button onClick={() => handleCreateReport(order.order_id)}>
                    Create Report Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No orders as buyer.</p>
          )}
        </div>

        <div className="role-section">
          <h2>As Seller</h2>
          {sellerOrders.length > 0 ? (
            sellerOrders.map((order) => (
              <div key={order.order_id} className="order-entry">
                <p className="order-details">Service: {order.serviceName}</p>
                <p className="order-details">
                  Exchanging with:{" "}
                  {getCategoryNameById(order.service_in_exchange_id)}
                </p>
                <div className="order-actions">
                  <button onClick={() => handleMarkAsDone(order)}>
                    Mark as Done
                  </button>
                  <button onClick={() => handleCreateReport(order.order_id)}>
                    Create Report Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No orders as seller.</p>
          )}
        </div>
        <div className="role-section partial-completed-section">
          <h2>Waiting your completion...</h2>
          {partiallyCompletedOrders.length > 0 ? (
            partiallyCompletedOrders.map((order) => (
              <div key={order.order_id} className="order-entry">
                <p className="order-details">Service: {order.serviceName}</p>
                <p className="order-details">
                  Exchanging with:{" "}
                  {getCategoryNameById(order.service_in_exchange_id)}
                </p>
                <p className="order-details">
                  Status:{" "}
                  {order.buyer_fk_user_id === parseInt(userId)
                    ? "Seller Completed"
                    : "Buyer Completed"}
                </p>
              </div>
            ))
          ) : (
            <p>No orders completed on one end.</p>
          )}
        </div>

        <div className="role-section completed-section">
          <h2>Completed Orders</h2>
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => (
              <div key={order.order_id} className="order-entry completed-entry">
                <p className="order-details">Service: {order.serviceName}</p>
                <p className="order-details">
                  Exchanging with:{" "}
                  {getCategoryNameById(order.service_in_exchange_id)}
                </p>
              </div>
            ))
          ) : (
            <p>No completed orders.</p>
          )}
        </div>

        {showModal && (
          <div className="modal-o">
            <div className="modal-content-o">
              <h4>Confirm Completion</h4>
              <p>Did the other user complete his end of the deal?</p>
              <div className="rating-container">
                <label className="rating-label">Rating:</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
              </div>
              <button onClick={confirmMarkAsDone}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        )}
        {showReportModal && (
          <div className="modal-o">
            <div className="modal-content-o">
              <h4>Create Report Ticket</h4>
              <input
                type="text"
                placeholder="Title"
                value={reportTitle}
                onChange={handleReportChange(setReportTitle)}
              />
              <textarea
                placeholder="Message"
                value={reportMessage}
                onChange={handleReportChange(setReportMessage)}
              />
              {formError && <div className="form-error">{formError}</div>}

              <button onClick={submitReport}>Submit Report</button>
              <button onClick={() => setShowReportModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
