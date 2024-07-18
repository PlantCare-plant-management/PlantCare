const { ObjectId } = require("mongodb");
const {
  getPlants,
  getPlantById,
  addToMyPlant,
  getMyPlants,
} = require("../models/plantModel");

const storage = require("../config/firebase-config");
const { v4: uuidv4 } = require("uuid");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

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
      const userId = req.user.id.toString();
      const imgFile = req.file;
      if (!imgFile) {
        return res.status(400).send("There is no Image");
      }

      const fileName = `${userId} - ${uuidv4()}`;
      const imageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(imageRef, imgFile.buffer);
      const imgUrl = await getDownloadURL(snapshot.ref);

      const { name, location, plantId, actions } = req.body;
      const addMyPlant = {
        userId,
        name,
        location,
        photo: imgUrl,
        plantId: new ObjectId(plantId),
        actions: JSON.parse(actions),
        createdAt: new Date(),
      };

      const result = await addToMyPlant(addMyPlant);
      console.log(result, "ini result addToMyPlant");
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  
}

module.exports = PlantController;
