const { getDB } = require("../config/mongoDb");

const ObjectId = require("mongodb").ObjectId;

const getPlants = async () => {
  const db = getDB();
  return await db.collection("plants").find().toArray();
};

const getPlantById = async (id) => {
  const db = getDB();
  const collection = db.collection("plants");
  return await collection.findOne({ _id: new ObjectId(id) });
};

const addToMyPlant = async (plant) => {
  const db = getDB();
  const collection = db.collection("myPlants");
  return await collection.insertOne(plant);
};

const getMyPlants = async (id) => {
  const db = getDB();
  const collection = db.collection("myPlants");
  return await collection
    .aggregate([
      {
        $match: {
          userId: id,
        },
      },
      {
        $lookup: {
          from: "plants",
          localField: "plantId",
          foreignField: "_id",
          as: "plants",
        },
      },
      {
        $unwind: {
          path: "$plants",
        },
      },
    ])
    .toArray();
};

const getMyPlantById = async (id, myPlantId) => {
  const db = getDB();
  const collection = db.collection("myPlants");
  return await collection
    .aggregate([
      {
        $match: {
          _id: new ObjectId(myPlantId),
          userId: id,
        },
      },
      {
        $lookup: {
          from: "plants",
          localField: "plantId",
          foreignField: "_id",
          as: "plants",
        },
      },
      {
        $unwind: {
          path: "$plants",
        },
      },
    ])
    .toArray();
};

module.exports = {
  getPlants,
  getPlantById,
  addToMyPlant,
  getMyPlants,
  getMyPlantById,
};
