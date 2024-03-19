import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Categories = db.define("Categories", {
  category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Categories;
