const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const plantRoutes = require("./plantRoutes");
const myPlantRoutes = require("./myPlantRoutes");
const locationRoutes = require("./locationRoutes");

// ini untuk auth dan user
router.use("/", userRoutes);

// untuk plants
router.use("/plants", plantRoutes);

// untuk myPlants
router.use("/myplants", myPlantRoutes);

router.use("/locations", locationRoutes);

module.exports = router;