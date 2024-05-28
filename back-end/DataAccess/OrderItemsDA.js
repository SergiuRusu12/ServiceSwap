import OrderItems from "../Entities/OrderItems.js";

async function getOrderItems() {
  return await OrderItems.findAll();
}

async function getOrderItemById(order_item_id) {
  return await OrderItems.findByPk(order_item_id);
}

async function createOrderItem(orderItem) {
  return await OrderItems.create(orderItem);
}

async function deleteOrderItemById(order_item_id) {
  return await OrderItems.destroy({ where: { order_item_id } });
}

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
