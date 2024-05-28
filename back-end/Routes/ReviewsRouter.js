import express from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  deleteReviewById,
  updateReviewById,
} from "../DataAccess/ReviewsDA.js";

let reviewsRouter = express.Router();

reviewsRouter.post("/review", async (req, res) => {
  return res.status(201).json(await createReview(req.body));
});

reviewsRouter.get("/reviews", async (req, res) => {
  return res.json(await getReviews());
});

reviewsRouter.get("/review/:id", async (req, res) => {
  return res.json(await getReviewById(req.params.id));
});

reviewsRouter.delete("/review/:id", async (req, res) => {
  await deleteReviewById(req.params.id);
  return res.status(204).send();
});

reviewsRouter.put("/review/:id", async (req, res) => {
  let result = await updateReviewById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Review updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Review not found" });
  }
});

export default reviewsRouter;
