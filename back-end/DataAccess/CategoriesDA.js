// CategoriesDA.js

import Categories from "../Entities/Categories.js";

async function getCategories() {
  return await Categories.findAll();
}

async function getCategoryById(category_id) {
  return await Categories.findByPk(category_id);
}

async function createCategory(category) {
  return await Categories.create(category);
}

async function deleteCategoryById(category_id) {
  return await Categories.destroy({ where: { category_id } });
}

async function updateCategoryById(category_id, categoryDetails) {
  return await Categories.update(categoryDetails, { where: { category_id } });
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
};