const express = require("express");
const MyPlantController = require("../controllers/myPlantController");
const authentication = require("../middleware/authentication");
const router = express.Router();

// routes
router.get("/", authentication, MyPlantController.getAllMyPlants);
router.post("/update", MyPlantController.updateMyPlant)
module.exports = router;