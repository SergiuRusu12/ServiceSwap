import db from "../dbConfig.js";
import Sequelize from "sequelize";

const Services = db.define("Services", {
  service_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  item_in_exchange: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  seller_fk_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  service_status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category_fk: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  locality: {
    type: Sequelize.STRING, // Assuming locality is a string like "Cluj-Napoca"
    allowNull: true, // Assuming locality may not be applicable to all categories, set to false if it's always required
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true, // or false if you want to make it required
  },
  extra_image_1: {
    type: Sequelize.STRING,
    allowNull: true, // Set to false if the image is required
  },
  // Adding the extra_image_3 field
  extra_image_2: {
    type: Sequelize.STRING,
    allowNull: true, // Set to false if the image is required
  },
});

export default Services;
