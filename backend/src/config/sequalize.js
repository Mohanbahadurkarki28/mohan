const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hostel", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
