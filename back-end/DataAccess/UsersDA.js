// UserDA.js

import User from "../Entities/Users.js";

// Function to get all users
async function getUsers() {
  return await User.findAll();
}

// Function to get a user by ID
async function getUserById(user_id) {
  return await User.findByPk(user_id);
}

// Function to create a new user
async function createUser(user) {
  return await User.create(user);
}

// Function to delete a user by ID
async function deleteUserById(user_id) {
  return await User.destroy({ where: { user_id } });
}

// Function to update a user by ID
async function updateUserById(user_id, userDetails) {
  return await User.update(userDetails, { where: { user_id } });
}

export { getUsers, getUserById, createUser, deleteUserById, updateUserById };
