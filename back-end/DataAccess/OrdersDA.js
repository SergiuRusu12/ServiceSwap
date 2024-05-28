import Orders from "../Entities/Orders.js";

async function getOrders() {
  return await Orders.findAll();
}

async function createOrder(orderDetails) {
  try {
    return await Orders.create(orderDetails);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function getOrderById(order_id) {
  return await Orders.findByPk(order_id);
}

async function deleteOrderById(order_id) {
  return await Orders.destroy({ where: { order_id } });
}

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
