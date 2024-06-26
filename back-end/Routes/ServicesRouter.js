import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  deleteServiceById,
  updateServiceById,
  getServicesByCategoryId,
  updateServiceImageById,
  updateAllServiceImagesById,
  updateServiceExtraImage1ById,
  updateServiceExtraImage2ById,
  getServicesByUserId,
  updateServiceStatusById,
} from "../DataAccess/ServicesDA.js";

let servicesRouter = express.Router();

servicesRouter.post("/service", async (req, res) => {
  return res.status(201).json(await createService(req.body));
});

servicesRouter.get("/services", async (req, res) => {
  return res.json(await getServices());
});

servicesRouter.get("/service/:id", async (req, res) => {
  return res.json(await getServiceById(req.params.id));
});

servicesRouter.delete("/service/:id", async (req, res) => {
  await deleteServiceById(req.params.id);
  return res.status(204).send();
});

servicesRouter.put("/service/:id", async (req, res) => {
  let result = await updateServiceById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Service updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Service not found" });
  }
});

servicesRouter.get("/services/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const services = await getServicesByCategoryId(categoryId);
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error fetching services by category" });
  }
});
servicesRouter.put("/service/:id/image", async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;
  try {
    const result = await updateServiceImageById(id, imageUrl);
    if (result[0]) {
      res.json({ message: "Image updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Error updating image" });
  }
});

servicesRouter.put("/service/:id/extraImage1", async (req, res) => {
  const { id } = req.params;
  const { extraImage1Url } = req.body;
  try {
    const result = await updateServiceExtraImage1ById(id, extraImage1Url);
    if (result[0]) {
      res.json({ message: "Extra Image 1 updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Service not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error updating Extra Image 1" });
  }
});

servicesRouter.get("/services/pending", async (req, res) => {
  try {
    const pendingServices = await Services.findAll({
      where: { service_status: "Pending" },
    });
    if (pendingServices.length > 0) {
      res.json(pendingServices);
    } else {
      res
        .status(404)
        .json({ error: true, message: "No pending services found" });
    }
  } catch (error) {
    console.error("Failed to fetch pending services:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

servicesRouter.patch("/service/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Active' or 'Denied'
  try {
    const result = await updateServiceById(id, { service_status: status });
    if (result[0]) {
      res.status(200).json({ message: "Service status updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Service not found" });
    }
  } catch (error) {
    console.error("Failed to update service status:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

servicesRouter.put("/service/:id/extraImage2", async (req, res) => {
  const { id } = req.params;
  const { extraImage2Url } = req.body;
  try {
    const result = await updateServiceExtraImage2ById(id, extraImage2Url);
    if (result[0]) {
      res.json({ message: "Extra Image 2 updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Service not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error updating Extra Image 2" });
  }
});

servicesRouter.put("/service/:id/allImages", async (req, res) => {
  const { id } = req.params;
  const { image_url, extra_image_1, extra_image_2 } = req.body;
  try {
    const result = await updateAllServiceImagesById(id, {
      image_url,
      extra_image_1,
      extra_image_2,
    });
    if (result[0]) {
      res.json({ message: "All images updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Error updating images" });
  }
});
servicesRouter.get("/services/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const services = await getServicesByUserId(userId);
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error fetching services for user" });
  }
});
servicesRouter.patch("/service/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await updateServiceStatusById(id, status);
    if (result) {
      res.status(200).json({ message: "Service status updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "Service not found" });
    }
  } catch (error) {
    console.error("Failed to update service status:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default servicesRouter;
