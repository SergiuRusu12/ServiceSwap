// servicesRouter.js

import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  deleteServiceById,
  updateServiceById,
} from "../DataAccess/ServicesDA.js";

let servicesRouter = express.Router();

// Route to create a new service
servicesRouter.post("/service", async (req, res) => {
  return res.status(201).json(await createService(req.body));
});

// Route to get all services
servicesRouter.get("/services", async (req, res) => {
  return res.json(await getServices());
});

// Route to get a service by ID
servicesRouter.get("/service/:id", async (req, res) => {
  return res.json(await getServiceById(req.params.id));
});

// Route to delete a service by ID
servicesRouter.delete("/service/:id", async (req, res) => {
  await deleteServiceById(req.params.id);
  return res.status(204).send();
});

// Route to update a service by ID
servicesRouter.put("/service/:id", async (req, res) => {
  let result = await updateServiceById(req.params.id, req.body);
  if (result[0]) {
    // Check if any rows were updated
    return res.status(200).json({ message: "Service updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Service not found" });
  }
});

export default servicesRouter;
