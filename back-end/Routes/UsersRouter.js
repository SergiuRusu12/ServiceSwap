// userRouter.js

import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
} from "../DataAccess/UsersDA.js";

let userRouter = express.Router();

// Route to create a new user
userRouter.post("/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: true, message: "Error creating user" });
  }
});

// Route to get all users
userRouter.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: true, message: "Error fetching users" });
  }
});

// Route to get a user by ID
userRouter.get("/user/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Error fetching user" });
  }
});

// Route to delete a user by ID
userRouter.delete("/user/:id", async (req, res) => {
  try {
    await deleteUserById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: true, message: "Error deleting user" });
  }
});

// Route to update a user by ID
userRouter.put("/user/:id", async (req, res) => {
  try {
    let result = await updateUserById(req.params.id, req.body);
    if (result[0]) {
      // Check if any rows were updated
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Error updating user" });
  }
});

export default userRouter;
