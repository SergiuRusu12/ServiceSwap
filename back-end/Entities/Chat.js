import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Chat = db.define("Chat", {
  chat_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

export default Chat;
