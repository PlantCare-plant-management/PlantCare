const { getPlants, getPlantById, getMyPlant } = require("../models/plantModel");

class PlantController {
  static async getAllPlants(req, res, next) {
    try {
      const plants = await getPlants();
      res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }

  static async getPlantById(req, res, next) {
    try {
      const plant = await getPlantById(req.params.id);
      if (!plant) {
        throw { name: "ITEM_NOT_FOUND" };
      }
      res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }

  static async getMyPlant(req, res, next) {
    try {
      const plant = await getMyPlant();
      res.status(200).json(plant)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PlantController;
