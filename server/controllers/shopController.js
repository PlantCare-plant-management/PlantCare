const {
  getPlantsFromMarketById,
  getPlantsFromMarket,
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
}

module.exports = ShopController;
