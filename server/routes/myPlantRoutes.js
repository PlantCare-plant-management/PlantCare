const express = require('express');
const authentication = require('../middleware/authentication');
const PlantController = require('../controllers/plantController');
const router = express.Router()

// routes
router.get("/", authentication, PlantController.getMyPlant);


module.exports = router;