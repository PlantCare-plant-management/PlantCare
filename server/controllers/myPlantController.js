const { getMyPlants, getMyPlantById } = require("../models/plantModel");

class MyPlantController {
  static async getAllMyPlants(req, res, next) {
    try {
      const id = req.user.id.toString();
      const myPlants = await getMyPlants(id);
      res.status(200).json(myPlants);
    } catch (error) {
      next(error);
    }
  }

  static async getMyPlantById(req, res, next) {
    try {
      const id = req.user.id.toString();
      const { myPlantId } = req.params;
      const myPlants = await getMyPlantById(id, myPlantId);
      res.status(200).json(myPlants);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyPlantController;
