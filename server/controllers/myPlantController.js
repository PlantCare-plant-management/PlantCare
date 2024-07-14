const { getMyPlants } = require("../models/plantModel");

class MyPlantController {
  static async getAllMyPlants(req, res, next) {
    try {
      const { userId } = req.params;
      const myPlants = await getMyPlants(userId);
      res.status(200).json(myPlants);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyPlantController;