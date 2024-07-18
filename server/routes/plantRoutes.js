const express = require("express");
const router = express.Router();
const PlantController = require("../controllers/plantController");
const authentication = require("../middleware/authentication");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", authentication, PlantController.getAllPlants);
router.post(
  "/",
  upload.single("imgUrl"),
  authentication,
  PlantController.addToMyPlant
);
router.get("/:id", authentication, PlantController.getPlantById);


module.exports = router;
