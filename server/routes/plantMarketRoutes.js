const express = require("express");
const router = express.Router();
const PlantController = require("../controllers/plantController");
const authentication = require("../middleware/authentication");

router.get("/", authentication ,PlantController.getPlantsFromMarket);
router.get("/:id", authentication ,PlantController.getPlantFromMarketById);

module.exports = router