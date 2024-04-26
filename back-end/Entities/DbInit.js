import mysql from "mysql2/promise.js";
import env from "dotenv";
import Categories from "./Categories.js";
import MessagesChat from "./MessagesChat.js";
import OrderItems from "./OrderItems.js";
import Orders from "./Orders.js";
import Reviews from "./Reviews.js";
import Services from "./Services.js";
import Users from "./Users.js";

env.config();

function Create_DB() {
  let conn;
  mysql
    .createConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })
    .then((connection) => {
      conn = connection;
      return connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
      );
    })
    .then(() => {
      return conn.end();
    })
    .catch((err) => {
      console.warn(err.stack);
    });
}
function FK_Config() {
  Users.hasMany(Orders, { foreignKey: "buyer_fk_user_id" });
  Users.hasMany(MessagesChat, { foreignKey: "sender_fk_user_id" });
  Orders.belongsTo(Users, { foreignKey: "buyer_fk_user_id" });
  Orders.hasMany(OrderItems, { foreignKey: "order_fk" });
  Orders.hasOne(Reviews, { foreignKey: "order_fk_order_id" });
  Services.belongsTo(Categories, { foreignKey: "category_fk" });
  OrderItems.belongsTo(Orders, { foreignKey: "order_fk" });
  OrderItems.belongsTo(Services, { foreignKey: "service_fk" });
  Categories.hasMany(Services, { foreignKey: "category_fk" });
  Users.hasMany(MessagesChat, { foreignKey: "receiver_fk_user_id" });
  MessagesChat.belongsTo(Services, { foreignKey: "service_id_fk" });
}

function DB_Init() {
  Create_DB();
  FK_Config();
}

export default DB_Init;
