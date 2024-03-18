import Sequelize from "sequelize";
import db from "../dbConfig.js";

const User = db.define("User", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profile_info: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

export default User;
