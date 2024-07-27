const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequalize");

const Hostel = sequelize.define("hostels", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rent: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  features: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Hostel;
