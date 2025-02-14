const {
  getLocation,
  addLocation,
  updateLocation,
} = require("../models/locationModel");

class LocationController {
  static async getAllLocations(req, res, next) {
    try {
      const userId = req.user.id
      const locations = await getLocation(userId);
      res.status(200).json(locations);
    } catch (error) {
      next(error);
    }
  }

  static async createLocation(req, res, next) {
    try {
      const { name } = req.body;
      const userId = req.user.id
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const newLocation = await addLocation(name, userId);
      res.status(201).json(newLocation);
    } catch (error) {
      next(error);
    }
  }

  static async editLocation(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const updatedLocation = await updateLocation(id, name);

      res.status(200).json(updatedLocation);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LocationController;