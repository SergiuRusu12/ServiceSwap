// OrdersDA.js

import Orders from "../Entities/Orders.js";

// Function to get all orders
async function getOrders() {
  return await Orders.findAll();
}

// Inside OrdersDA.js or similar file
async function createOrder(orderDetails) {
  try {
    return await Orders.create(orderDetails);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Function to get an order by ID
async function getOrderById(order_id) {
  return await Orders.findByPk(order_id);
}

// Function to delete an order by ID
async function deleteOrderById(order_id) {
  return await Orders.destroy({ where: { order_id } });
}

// Function to update an order by ID
async function updateOrderById(order_id, orderDetails) {
  return await Orders.update(orderDetails, { where: { order_id } });
}

export {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  updateOrderById,
};
