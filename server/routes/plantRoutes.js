const express = require("express");
const router = express.Router();
const PlantController = require("../controllers/plantController");
const authentication = require("../middleware/authentication");

router.get("/", authentication, PlantController.getAllPlants);
router.post("/",authentication, PlantController.addToMyPlant);
router.get("/:id", authentication, PlantController.getPlantById);
router.post("/seed", PlantController.seed)

module.exports = router;