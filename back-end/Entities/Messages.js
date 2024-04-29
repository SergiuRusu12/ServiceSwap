import Sequelize from "sequelize";
import db from "../dbConfig.js";

const Message = db.define("Message", {
  message_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  chat_id_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "MessagesChat",
      key: "chat_id",
    },
  },
  sender_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "user_id",
    },
  },
  receiver_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "user_id",
    },
  },
  message_content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  service_id_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Services",
      key: "service_id",
    },
  },
});

export default Message;
