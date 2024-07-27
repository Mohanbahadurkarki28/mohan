const express = require("express");

const router = express.Router();

const Booking = require("../models/booking");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, async (req, res) => {
  try {
    const booking = await Booking.create({
      userId: +req.user.userId,
      hostelId: +req.body.hostelId,
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user", authenticate, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.userId },
    });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const bookingId = req.params.id;
  const { userId, roomId, checkInDate, checkOutDate } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    booking.userId = userId;
    booking.roomId = roomId;
    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.destroy();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
