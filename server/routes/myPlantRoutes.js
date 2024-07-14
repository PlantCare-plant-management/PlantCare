const express = require("express");
const MyPlantController = require("../controllers/myPlantController");
const router = express.Router();

// routes
router.get("/:userId", MyPlantController.getAllMyPlants);

module.exports = router;