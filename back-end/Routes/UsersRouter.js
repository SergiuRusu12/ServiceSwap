import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  updateUserById2,
  updateUserTypeById,
} from "../DataAccess/UsersDA.js";

let userRouter = express.Router();

userRouter.post("/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: true, message: "Error creating user" });
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: true, message: "Error fetching users" });
  }
});

userRouter.patch("/user/:id/status", async (req, res) => {
  const { id } = req.params;
  const { user_type } = req.body;
  try {
    const result = await updateUserTypeById(id, user_type);
    if (result) {
      res.status(200).json({ message: "User status updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "User not found" });
    }
  } catch (error) {
    console.error("Failed to update user status:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

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

userRouter.delete("/user/:id", async (req, res) => {
  try {
    await deleteUserById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: true, message: "Error deleting user" });
  }
});

userRouter.put("/user/:id/status", async (req, res) => {
  try {
    const { user_type } = req.body;
    let result = await updateUserById(req.params.id, { user_type });
    if (result[0]) {
      res.status(200).json({ message: "User status updated successfully" });
    } else {
      res.status(404).json({ error: true, message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error updating user status" });
  }
});

export default userRouter;
