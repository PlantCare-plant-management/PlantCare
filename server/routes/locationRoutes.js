const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const LocationController = require("../controllers/locationController");

router.get("/", authentication, LocationController.getAllLocations);
router.post("/", authentication, LocationController.createLocation);
router.put("/:id", LocationController.editLocation);

module.exports = router;