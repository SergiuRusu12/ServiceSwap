import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategoriesByIds,
} from "../DataAccess/CategoriesDA.js";

let categoriesRouter = express.Router();

categoriesRouter.post("/category", async (req, res) => {
  return res.status(201).json(await createCategory(req.body));
});

categoriesRouter.get("/categories", async (req, res) => {
  return res.json(await getCategories());
});

categoriesRouter.get("/category/:id", async (req, res) => {
  return res.json(await getCategoryById(req.params.id));
});

categoriesRouter.delete("/category/:id", async (req, res) => {
  await deleteCategoryById(req.params.id);
  return res.status(204).send();
});

categoriesRouter.put("/category/:id", async (req, res) => {
  let result = await updateCategoryById(req.params.id, req.body);
  if (result[0]) {
    return res.status(200).json({ message: "Category updated successfully" });
  } else {
    return res.status(404).json({ error: true, message: "Category not found" });
  }
});

categoriesRouter.post("/categories/names", async (req, res) => {
  try {
    const categoryIds = req.body;

    const categories = await getCategoriesByIds(categoryIds);
    res.json(categories.map((cat) => cat.name));
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error fetching category names" });
  }
});

export default categoriesRouter;
