const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const ShopController = require("../controllers/shopController");

router.get("/", authentication ,ShopController.getPlantsFromMarket);
router.get("/history-order", authentication ,ShopController.getHistoryOrder);
router.patch('/order/:orderId', authentication, ShopController.updateOrderStatus);
router.get("/:id", authentication ,ShopController.getPlantFromMarketById);

module.exports = router