const express = require("express");
const path = require("node:path");
const cors = require("cors");

const sequelize = require("./config/sequalize");

// ROUTES
const authRoutes = require("./routes/auth");
const hostelRoutes = require("./routes/hostel");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

console.log(path.join(__dirname, "..", "public"));
app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/bookings", bookingRoutes);

(async () => {
  try {
    await sequelize.sync();
    app.listen(8000, () => {
      console.log(`Server is running on port ${8000}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
