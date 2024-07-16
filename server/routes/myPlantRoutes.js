const express = require("express");
const MyPlantController = require("../controllers/myPlantController");
const authentication = require("../middleware/authentication");
const router = express.Router();

// routes
router.get("/", authentication, MyPlantController.getAllMyPlants);
router.get("/:myPlantId", authentication, MyPlantController.getMyPlantById);


module.exports = router;