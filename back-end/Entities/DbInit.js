import mysql from "mysql2/promise.js";
import env from "dotenv";
import Categories from "./Categories.js";
import OrderItems from "./OrderItems.js";
import Orders from "./Orders.js";
import Reviews from "./Reviews.js";
import Services from "./Services.js";
import Users from "./Users.js";
import Message from "./Messages.js";
import Chat from "./Chat.js";
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
  // User and Order Relationships
  Users.hasMany(Orders, { foreignKey: "buyer_fk_user_id" });
  Orders.belongsTo(Users, { foreignKey: "buyer_fk_user_id" });

  Users.hasMany(Orders, {
    as: "SellerOrders",
    foreignKey: "seller_fk_user_id",
  });
  Orders.belongsTo(Users, { as: "Seller", foreignKey: "seller_fk_user_id" });

  // User and Review Relationships via Orders
  Orders.hasOne(Reviews, { foreignKey: "order_fk_order_id" });

  // OrderItems and Services/Orders Relationships
  OrderItems.belongsTo(Orders, { foreignKey: "order_fk" });
  OrderItems.belongsTo(Services, { foreignKey: "service_fk" });
  Orders.hasMany(OrderItems, { foreignKey: "order_fk" });

  // Services and Categories Relationships
  Services.belongsTo(Categories, { foreignKey: "category_fk" });
  Categories.hasMany(Services, { foreignKey: "category_fk" });

  // Chat and User Relationships
  // Assuming a Chat can involve multiple users, potentially many-to-many (simplified here for two users)
  Users.hasMany(Chat, { as: "ChatsInitiated", foreignKey: "initiator_id" });
  Users.hasMany(Chat, { as: "ChatsReceived", foreignKey: "receiver_id" });
  Chat.belongsTo(Users, { as: "Initiator", foreignKey: "initiator_id" });
  Chat.belongsTo(Users, { as: "Receiver", foreignKey: "receiver_id" });

  // Messages and Chat/User/Service Relationships
  Message.belongsTo(Chat, { foreignKey: "chat_id_fk" });
  Chat.hasMany(Message, { foreignKey: "chat_id_fk" });

  // A message has one sender, which is a user

  Message.belongsTo(Users, { as: "Sender", foreignKey: "sender_id" });
  Users.hasMany(Message, { as: "MessagesSent", foreignKey: "sender_id" });

  // Each message can be linked to a specific service
  Message.belongsTo(Services, { foreignKey: "service_id_fk" });

  // If a Chat is directly linked to a Service (optional)
  Chat.belongsTo(Services, { foreignKey: "service_id_fk" });
}

function DB_Init() {
  Create_DB();
  FK_Config();
}

export default DB_Init;
