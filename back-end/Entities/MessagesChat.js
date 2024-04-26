import db from "../dbConfig.js";
import Sequelize from "sequelize";

const MessagesChat = db.define("MessagesChat", {
  msg_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  sender_fk_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_fk: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  msg_content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  receiver_fk_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false, // Set to false if every message must have a receiver, true if optional
  },
  service_id_fk: {
    type: Sequelize.INTEGER,
    allowNull: false, // Set to false if messages are always related to a service
  },
});

export default MessagesChat;
