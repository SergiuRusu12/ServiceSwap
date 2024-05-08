// ordersRouter.js

import express from "express";
import Orders from "../Entities/Orders.js";
import {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  updateOrderById,
} from "../DataAccess/OrdersDA.js";

let ordersRouter = express.Router();

// Example POST route handler in your ordersRouter

ordersRouter.post("/order", async (req, res) => {
  const {
    buyer_fk_user_id,
    seller_fk_user_id,
    service_fk_service_id,
    service_in_exchange_id,
    order_status_buyer,
    order_status_seller,
    chat_id,
  } = req.body;
  try {
    const newOrder = await createOrder({
      buyer_fk_user_id,
      seller_fk_user_id,
      service_fk_service_id,
      service_in_exchange_id,
      order_status_buyer,
      order_status_seller,
      chat_id,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this inside ordersRouter.js

// Route to get an order by chatId
ordersRouter.get("/orders/byChat/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    const orders = await Orders.findAll({
      where: { chat_id: chatId },
    });
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ error: true, message: "No orders found for this chat." });
    }
    res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders by chatId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all orders
ordersRouter.get("/orders", async (req, res) => {
  return res.json(await getOrders());
});

// Route to get an order by ID
ordersRouter.get("/order/:id", async (req, res) => {
  return res.json(await getOrderById(req.params.id));
});

// Route to delete an order by ID
ordersRouter.delete("/order/:id", async (req, res) => {
  await deleteOrderById(req.params.id);
  return res.status(204).send();
});

ordersRouter.put("/order/:id", async (req, res) => {
  let result = await updateOrderById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Order updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Order not found" });
  }
});
// Updates the order status for either buyer or seller
ordersRouter.patch("/order/:id/status", async (req, res) => {
  const { userId, status, role } = req.body; // role should be either 'buyer' or 'seller'
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    if (role === "buyer") {
      order.order_status_buyer = status;
    } else if (role === "seller") {
      order.order_status_seller = status;
    }

    await order.save();
    return res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return res
      .status(500)
      .json({ error: true, message: "Failed to update order status." });
  }
});

ordersRouter.get("/orders/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const buyerOrders = await Orders.findAll({
      where: { buyer_fk_user_id: userId },
    });
    const sellerOrders = await Orders.findAll({
      where: { seller_fk_user_id: userId },
    });
    res.json({ buyerOrders, sellerOrders });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
ordersRouter.patch("/order/:id/statuss", async (req, res) => {
  const { order_status_buyer, order_status_seller } = req.body;
  try {
    const result = await updateOrderById(req.params.id, {
      order_status_buyer,
      order_status_seller,
    });
    if (result[0]) {
      res.status(200).json({ message: "Order status updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Order not found" });
    }
  } catch (error) {
    console.error("Failed to update order status:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default ordersRouter;
