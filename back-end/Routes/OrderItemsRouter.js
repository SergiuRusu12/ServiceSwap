import express from "express";
import {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItemById,
  updateOrderItemById,
} from "../DataAccess/OrderItemsDA.js";

let orderItemsRouter = express.Router();

orderItemsRouter.post("/orderItem", async (req, res) => {
  return res.status(201).json(await createOrderItem(req.body));
});

orderItemsRouter.get("/orderItems", async (req, res) => {
  return res.json(await getOrderItems());
});

orderItemsRouter.get("/orderItem/:id", async (req, res) => {
  return res.json(await getOrderItemById(req.params.id));
});

orderItemsRouter.delete("/orderItem/:id", async (req, res) => {
  await deleteOrderItemById(req.params.id);
  return res.status(204).send();
});

orderItemsRouter.put("/orderItem/:id", async (req, res) => {
  let result = await updateOrderItemById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Order item updated successfully" });
  } else {
    return res
      .status(404)
      .json({ error: true, message: "Order item not found" });
  }
});

export default orderItemsRouter;
