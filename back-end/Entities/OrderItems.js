import db from "../dbConfig.js";
import Sequelize from "sequelize";

const OrderItems = db.define("OrderItems", {
  order_item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  service_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default OrderItems;
