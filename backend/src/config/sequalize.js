const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hostel", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
