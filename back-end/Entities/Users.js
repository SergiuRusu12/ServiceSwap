import db from "../dbConfig.js";
import Sequelize from "sequelize";

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

  user_type: {
    type: Sequelize.ENUM("normal", "admin", "banned"),
    allowNull: false,
    defaultValue: "normal",
  },
});

export default User;
