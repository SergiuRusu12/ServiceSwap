import User from "../Entities/Users.js";

async function getUsers() {
  return await User.findAll();
}

async function getUserById(user_id) {
  return await User.findByPk(user_id);
}

async function createUser(user) {
  return await User.create(user);
}

async function deleteUserById(user_id) {
  return await User.destroy({ where: { user_id } });
}

async function updateUserById(user_id, userDetails) {
  return await User.update(userDetails, { where: { user_id } });
}

async function updateUserById2(userId, updateParams) {
  const [updated] = await User.update(updateParams, { where: { id: userId } });
  return updated;
}
async function updateUserTypeById(userId, userType) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return false;
    }
    await user.update({ user_type: userType });
    return true;
  } catch (error) {
    console.error("Error updating user type:", error);
    return false;
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  updateUserById2,
  updateUserTypeById,
};
