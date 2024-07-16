const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const ShopController = require("../controllers/shopController");

router.get("/", authentication ,ShopController.getPlantsFromMarket);
router.get("/:id", authentication ,ShopController.getPlantFromMarketById);

module.exports = router