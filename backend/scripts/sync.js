const sequelize = require("../src/config/sequalize");

const User = require("../src/models/user");
const Hostel = require("../src/models/hostel");
const Booking = require("../src/models/booking");

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();
