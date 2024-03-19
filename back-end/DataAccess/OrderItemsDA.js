// OrderItemsDA.js

import OrderItems from "../Entities/OrderItems.js";

// Function to get all order items
async function getOrderItems() {
  return await OrderItems.findAll();
}

// Function to get an order item by ID
async function getOrderItemById(order_item_id) {
  return await OrderItems.findByPk(order_item_id);
}

// Function to create a new order item
async function createOrderItem(orderItem) {
  return await OrderItems.create(orderItem);
}

// Function to delete an order item by ID
async function deleteOrderItemById(order_item_id) {
  return await OrderItems.destroy({ where: { order_item_id } });
}

// Function to update an order item by ID
async function updateOrderItemById(order_item_id, orderItemDetails) {
  return await OrderItems.update(orderItemDetails, {
    where: { order_item_id },
  });
}

export {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItemById,
  updateOrderItemById,
};
