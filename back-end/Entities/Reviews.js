import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Reviews = db.define("Reviews", {
  review_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_fk_order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  review_text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

export default Reviews;
