const { ObjectId } = require("mongodb");
const { getMyPlants, updateMyPlant } = require("../models/plantModel");

class MyPlantController {
  static async getAllMyPlants(req, res, next) {
    try {
      const id = req.user.id.toString()
      const myPlants = await getMyPlants(id);
      res.status(200).json(myPlants);
    } catch (error) {
      next(error);
    }
  }

  static async updateMyPlant(req, res, next) {
    try {
      const {plantId, actions} = req.body
      console.log("masuk")
      console.log(plantId, actions)
      const updatedAction = await updateMyPlant(plantId,actions)
      console.log(updatedAction)
      res.status(201).json(updatedAction)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MyPlantController;