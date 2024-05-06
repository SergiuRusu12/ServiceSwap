import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components-css/Orders.css";

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
  const navigate = useNavigate();

  // Fetch categories
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

  // Fetch orders and service titles
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
              ((order.order_status_buyer === "InProgress" &&
                order.order_status_seller === "InProgress") ||
                (order.order_status_buyer === "Completed" &&
                  order.order_status_seller === "InProgress") ||
                (order.order_status_buyer === "InProgress" &&
                  order.order_status_seller === "Completed"))
          )
        );

        setSellerOrders(
          ordersWithServices.filter(
            (order) =>
              order.seller_fk_user_id === parseInt(userId) &&
              ((order.order_status_buyer === "InProgress" &&
                order.order_status_seller === "InProgress") ||
                (order.order_status_buyer === "Completed" &&
                  order.order_status_seller === "InProgress") ||
                (order.order_status_buyer === "InProgress" &&
                  order.order_status_seller === "Completed"))
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

  // Utility to get category name by ID
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
        setShowModal(false);
        // Optionally refresh orders here or navigate
      })
      .catch((error) => {
        console.error("Failed to update order status:", error);
      });
    navigate(0);
  };

  const handleCreateReport = (orderId) => {
    console.log("Creating report for:", orderId);
    // API call to create a report could go here
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>

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
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm Completion</h4>
            <p>Did the other user complete his end of the deal?</p>
            <button onClick={confirmMarkAsDone}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
