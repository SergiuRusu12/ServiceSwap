import React from "react";
import "../components-css/OrderRequestModal.css"; // Ensure the CSS file is correctly linked

const OrderRequestModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Order</h2>
        <p>Are you sure you want to initiate this order?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">
            Confirm
          </button>
          <button onClick={onClose} className="close-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderRequestModal;
