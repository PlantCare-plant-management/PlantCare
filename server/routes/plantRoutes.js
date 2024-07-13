const express = require("express");
const router = express.Router();
const PlantController = require("../controllers/plantController");
const authentication = require("../middleware/authentication");

router.get("/", authentication, PlantController.getAllPlants);
router.get("/:id", authentication, PlantController.getPlantById);

module.exports = router;
