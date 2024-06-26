import React, { useState, useEffect } from "react";
import "../components-css/OrderRequestModal.css";
import { useNavigate } from "react-router";

const OrderRequestModal = ({
  onClose,
  onConfirm,
  serviceId,
  sellerId,
  userId,
  chatId,
  isBuyer,
  orderDetails,
}) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9000/api/service/${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceDetails(data);
        setSelectedCategory(data.item_in_exchange || "");
      })
      .catch((err) => console.error("Failed to fetch service details", err));

    fetch("http://localhost:9000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })

      .catch((err) => console.error("Failed to fetch categories", err));
  }, [serviceId]);

  const getCategoryIdByName = (categories, selectedCategory) => {
    const matchedCategory = categories.find(
      (c) => c.category_name === selectedCategory
    );
    return matchedCategory ? matchedCategory.category_id : null;
  };

  const getExchangeItem = (categories, orderDetails) => {
    if (!orderDetails) return null;
    const matchedCategoryTitle = categories.find(
      (c) =>
        Number(c.category_id) === Number(orderDetails[0].service_in_exchange_id)
    );
    return matchedCategoryTitle ? matchedCategoryTitle.category_name : null;
  };

  const exch = getExchangeItem(categories, orderDetails);

  const cat = getCategoryIdByName(categories, selectedCategory);

  const handleConfirm = () => {
    console.log(exch);
    const orderData = {
      buyer_fk_user_id: userId,
      seller_fk_user_id: sellerId,
      service_fk_service_id: serviceId,
      service_in_exchange_id:
        getCategoryIdByName(categories, selectedCategory) || selectedCategory,
      order_status_buyer: "InProgress",
      order_status_seller: "Pending",
      chat_id: chatId,
    };

    fetch("http://localhost:9000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created:", data);
        onConfirm();
      })
      .catch((err) => {
        console.error("Failed to create order:", err);
      });
    navigate(0);
  };

  const handleAccept = () => {
    fetch(
      `http://localhost:9000/api/order/${orderDetails[0].order_id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: sellerId,
          status: "InProgress",
          role: "seller",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Order updated:", data);
        onConfirm();
      })
      .catch((err) => console.error("Failed to update order status:", err));
    navigate(0);
  };

  const handleDeny = () => {
    fetch(`http://localhost:9000/api/order/${orderDetails[0].order_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Order deleted");
          onClose();
        }
      })
      .catch((err) => console.error("Failed to delete order:", err));
    navigate(0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-orm">
        <h2>{isBuyer ? "Confirm Order" : "Respond to Order"}</h2>
        {serviceDetails && (
          <>
            <p>
              <strong>Service:</strong> {serviceDetails.title}
            </p>
            <p>
              <strong>Description:</strong> {serviceDetails.description}
            </p>
            {!isBuyer && (
              <div>
                <p>
                  <strong>Service in Exchange Offered:</strong> {exch}
                </p>
              </div>
            )}
            {isBuyer && (
              <div>
                <label htmlFor="serviceInExchange">Service in Exchange:</label>
                <select
                  id="serviceInExchange"
                  value={cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        <div className="modal-actions">
          {isBuyer ? (
            <button onClick={handleConfirm} className="confirm-button">
              Confirm
            </button>
          ) : (
            <>
              <button onClick={handleAccept} className="confirm-button">
                Accept
              </button>
              <button onClick={handleDeny} className="deny-button">
                Deny
              </button>
            </>
          )}
          <button onClick={onClose} className="close-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderRequestModal;
