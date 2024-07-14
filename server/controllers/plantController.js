const {
  getPlants,
  getPlantById,
  addToMyPlant,
  getMyPlants,
} = require("../models/plantModel");

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

  static async addToMyPlant(req, res, next) {
    try {
      const { userId, name, location, photo } = req.body;

      const addMyPlant = { userId, name, location, photo };

      const result = await addToMyPlant(addMyPlant);
      console.log(result, "ini result addToMyPlant");
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PlantController;