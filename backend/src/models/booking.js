const { DataTypes } = require("sequelize");

const User = require("./user");
const Hostel = require("./hostel");
const sequelize = require("../config/sequalize");

const Booking = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  hostelId: {
    type: DataTypes.INTEGER,
    references: {
      model: Hostel,
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("PENDING", "SUCCESS", "CANCELLED"),
    defaultValue: "PENDING",
  },
});

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Hostel.hasMany(Booking, { foreignKey: "hostelId" });
Booking.belongsTo(User, { foreignKey: "userId" });

module.exports = Booking;
