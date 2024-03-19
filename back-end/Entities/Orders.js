import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Orders = db.define("Orders", {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  buyer_fk_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  service_fk_service_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  payment_info: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

export default Orders;
