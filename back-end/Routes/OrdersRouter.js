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

// Route to create a new order
ordersRouter.post("/order", async (req, res) => {
  return res.status(201).json(await createOrder(req.body));
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

// Route to update an order by ID
ordersRouter.put("/order/:id", async (req, res) => {
  let result = await updateOrderById(req.params.id, req.body);
  if (result[0]) {
    // Check if any rows were updated
    return res.status(200).json({ message: "Order updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Order not found" });
  }
});

export default ordersRouter;
