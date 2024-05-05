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
  seller_fk_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  service_fk_service_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  service_in_exchange_id: {
    type: Sequelize.INTEGER,
    allowNull: true, // This field can be null if no service is exchanged
  },
  order_status_buyer: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Pending", // Defaulting to 'Pending'
  },
  order_status_seller: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Pending", // Defaulting to 'Pending'
  },
  chat_id: {
    // Ensure you have this field if using chat_id to link orders
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Orders;
