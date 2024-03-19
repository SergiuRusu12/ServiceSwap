// ReviewsDA.js

import Reviews from "../Entities/Reviews.js";

// Function to get all reviews
async function getReviews() {
  return await Reviews.findAll();
}

// Function to get a review by ID
async function getReviewById(review_id) {
  return await Reviews.findByPk(review_id);
}

// Function to create a new review
async function createReview(review) {
  return await Reviews.create(review);
}

// Function to delete a review by ID
async function deleteReviewById(review_id) {
  return await Reviews.destroy({ where: { review_id } });
}

// Function to update a review by ID
async function updateReviewById(review_id, reviewDetails) {
  return await Reviews.update(reviewDetails, { where: { review_id } });
}

export {
  getReviews,
  getReviewById,
  createReview,
  deleteReviewById,
  updateReviewById,
};
