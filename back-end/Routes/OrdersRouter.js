// ordersRouter.js

import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrderById,
  updateOrderById,
} from "../DataAccess/OrdersDA.js";

let ordersRouter = express.Router();

ordersRouter.post("/order", async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    return res.status(201).json(newOrder);
  } catch (error) {
    return res
      .status(400)
      .json({ error: true, message: "Failed to create order." });
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

export default ordersRouter;
