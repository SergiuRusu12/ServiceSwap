import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategoriesByIds, // Import the new function
} from "../DataAccess/CategoriesDA.js";

let categoriesRouter = express.Router();

// Route to create a new category
categoriesRouter.post("/category", async (req, res) => {
  return res.status(201).json(await createCategory(req.body));
});

// Route to get all categories
categoriesRouter.get("/categories", async (req, res) => {
  return res.json(await getCategories());
});

// Route to get a category by ID
categoriesRouter.get("/category/:id", async (req, res) => {
  return res.json(await getCategoryById(req.params.id));
});

// Route to delete a category by ID
categoriesRouter.delete("/category/:id", async (req, res) => {
  await deleteCategoryById(req.params.id);
  return res.status(204).send(); // No content to send back
});

// Route to update a category by ID
categoriesRouter.put("/category/:id", async (req, res) => {
  let result = await updateCategoryById(req.params.id, req.body);
  if (result[0]) {
    // Sequelize update returns an array where the first element is the number of affected rows
    return res.status(200).json({ message: "Category updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Category not found" });
  }
});

categoriesRouter.post("/categories/names", async (req, res) => {
  try {
    const categoryIds = req.body; // Expect an array of category IDs
    // Fetch categories directly by their IDs
    const categories = await getCategoriesByIds(categoryIds);
    res.json(categories.map((cat) => cat.name));
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error fetching category names" });
  }
});

export default categoriesRouter;
