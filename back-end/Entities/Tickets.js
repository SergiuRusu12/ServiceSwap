import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Tickets = db.define("Tickets", {
  ticket_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ticket_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ticket_message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  ticket_status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Open",
  },
  ticket_creator_user_id_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_id_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Tickets;
