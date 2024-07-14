const { getMyPlants } = require("../models/plantModel");

class MyPlantController {
  static async getAllMyPlants(req, res, next) {
    try {
      const id = req.user.id.toString()
      console.log(id)
      const myPlants = await getMyPlants(id);
      console.log(myPlants)
      res.status(200).json(myPlants);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyPlantController;