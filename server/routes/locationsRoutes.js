const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const LocationController = require("../controllers/locationController");

router.get("/", LocationController.getAllLocations);
router.post("/", LocationController.createLocation);
router.put("/:id", LocationController.editLocation);

module.exports = router;
