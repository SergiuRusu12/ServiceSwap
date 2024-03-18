import { Sequelize } from "sequelize";

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
});

export default Services;
