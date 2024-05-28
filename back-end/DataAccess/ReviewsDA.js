import Reviews from "../Entities/Reviews.js";

async function getReviews() {
  return await Reviews.findAll();
}

async function getReviewById(review_id) {
  return await Reviews.findByPk(review_id);
}

async function createReview(review) {
  return await Reviews.create(review);
}

async function deleteReviewById(review_id) {
  return await Reviews.destroy({ where: { review_id } });
}

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
