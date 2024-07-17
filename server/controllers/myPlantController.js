const { ObjectId } = require("mongodb");
const { getMyPlants, updateMyPlant } = require("../models/plantModel");

class MyPlantController {
  static async getAllMyPlants(req, res, next) {
    try {
      const id = req.user.id.toString()
      const myPlants = await getMyPlants(id);
      myPlants.forEach(element => {
        if(element.actions) {
          element.actions.forEach(action => {
            console.log(action)
            if(new Date() - new Date(action.update) >= (action.frequency * 10000)) {
              action.status = false
              action.show = true
            }
            if(action.status && action.show) {
              if(new Date() - new Date(action.update) >= (10000)) {
                action.show = false
              }
            }
          })
        }
      });
      // if(new Date() - new Date(myPlants[0].actions[0].update) >= (myPlants[0].actions[0].frequency * 2000)) {
      //   myPlants[0].actions[0].status = false
      // }
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