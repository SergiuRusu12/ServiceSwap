// orderItemsRouter.js

import express from "express";
import {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItemById,
  updateOrderItemById,
} from "../DataAccess/OrderItemsDA.js";

let orderItemsRouter = express.Router();

// Route to create a new order item
orderItemsRouter.post("/orderItem", async (req, res) => {
  return res.status(201).json(await createOrderItem(req.body));
});

// Route to get all order items
orderItemsRouter.get("/orderItems", async (req, res) => {
  return res.json(await getOrderItems());
});

// Route to get an order item by ID
orderItemsRouter.get("/orderItem/:id", async (req, res) => {
  return res.json(await getOrderItemById(req.params.id));
});

// Route to delete an order item by ID
orderItemsRouter.delete("/orderItem/:id", async (req, res) => {
  await deleteOrderItemById(req.params.id);
  return res.status(204).send();
});

// Route to update an order item by ID
orderItemsRouter.put("/orderItem/:id", async (req, res) => {
  let result = await updateOrderItemById(req.params.id, req.body);
  if (result[0]) {
    // Sequelize update returns an array where the first element is the number of affected rows
    return res.status(200).json({ message: "Order item updated successfully" });
  } else {
    return res
      .status(404)
      .json({ error: true, message: "Order item not found" });
  }
});

export default orderItemsRouter;
