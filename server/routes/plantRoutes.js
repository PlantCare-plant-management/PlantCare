const express = require("express");
const router = express.Router();
const PlantController = require("../controllers/plantController");
const authentication = require("../middleware/authentication");

router.get("/", PlantController.getAllPlants);
router.get("/:id", PlantController.getPlantById);

module.exports = router;
