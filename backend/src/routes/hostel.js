const express = require("express");
const path = require("node:path");
const multer = require("multer");

const Hostel = require("../models/hostel");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/", upload.array("images"), async (req, res) => {
  const { name, description, rent, location, features } = req.body;

  const images = req.files.map((file) => file.filename);
  if (images.length === 0) {
    return res.status(400).json({ error: "Images are mandatory" });
  }

  // Validate rent
  const rentValue = parseInt(rent);
  if (isNaN(rentValue) || rentValue < 8000 || rentValue > 20000) {
    return res
      .status(400)
      .json({ error: "Rent must be a number between 8000 and 20000" });
  }

  try {
    const existingHostel = await Hostel.findOne({ where: { name } });

    if (existingHostel) {
      return res
        .status(400)
        .json({ error: "Hostel with this name already exists" });
    }

    const hostel = await Hostel.create({
      name,
      description,
      rent: rentValue,
      location: JSON.stringify(JSON.parse(location)),
      features: JSON.stringify(JSON.parse(features)),
      images: JSON.stringify(images),
    });

    res.status(201).json(hostel);
  } catch (error) {
    console.error("Error creating hostel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const hostels = await Hostel.findAll();
    res.json(hostels);
  } catch (error) {
    console.error("Error fetching hostels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const hostelId = req.params.id;
  try {
    const hostel = await Hostel.findByPk(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    res.json(hostel);
  } catch (error) {
    console.error("Error fetching hostel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const hostelId = req.params.id;
  const { name, location } = req.body;
  try {
    const hostel = await Hostel.findByPk(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    hostel.name = name;
    hostel.location = location;
    await hostel.save();
    res.json(hostel);
  } catch (error) {
    console.error("Error updating hostel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const hostelId = req.params.id;
  try {
    const hostel = await Hostel.findByPk(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    await hostel.destroy();
    res.json({ message: "Hostel deleted successfully" });
  } catch (error) {
    console.error("Error deleting hostel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
