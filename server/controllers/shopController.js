const {
  getPlantsFromMarketById,
  getPlantsFromMarket,
  getOrderHistory,
  updateOrderStatus
} = require("../models/shopModel");

class ShopController {
  static async getPlantsFromMarket(req, res, next) {
    try {
      const plants = await getPlantsFromMarket();
      res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }

  static async getPlantFromMarketById(req, res, next) {
    try {
      const plant = await getPlantsFromMarketById(req.params.id);
      if (!plant) {
        throw { name: "ITEM_NOT_FOUND" };
      }
      res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }

  static async getHistoryOrder(req, res) {
    try {
      const userId = req.user.id;
      const orders = await getOrderHistory(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  };

  static async updateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      console.log(orderId)
      const updatedOrder = await updateOrderStatus(orderId);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
}


module.exports = ShopController;