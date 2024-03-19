// reviewsRouter.js

import express from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  deleteReviewById,
  updateReviewById,
} from "../DataAccess/ReviewsDA.js";

let reviewsRouter = express.Router();

// Route to create a new review
reviewsRouter.post("/review", async (req, res) => {
  return res.status(201).json(await createReview(req.body));
});

// Route to get all reviews
reviewsRouter.get("/reviews", async (req, res) => {
  return res.json(await getReviews());
});

// Route to get a review by ID
reviewsRouter.get("/review/:id", async (req, res) => {
  return res.json(await getReviewById(req.params.id));
});

// Route to delete a review by ID
reviewsRouter.delete("/review/:id", async (req, res) => {
  await deleteReviewById(req.params.id);
  return res.status(204).send();
});

// Route to update a review by ID
reviewsRouter.put("/review/:id", async (req, res) => {
  let result = await updateReviewById(req.params.id, req.body);
  if (result[0]) {
    // Sequelize update returns an array where the first element is the number of affected rows
    return res.status(200).json({ message: "Review updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Review not found" });
  }
});

export default reviewsRouter;
