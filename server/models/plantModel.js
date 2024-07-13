const { getDB } = require('../config/mongoDb');

const ObjectId = require('mongodb').ObjectId;

const getPlants = async () => {
  const db = getDB();
  return await db.collection("plants").find().toArray();
};

const getPlantById = async (id) => {
  const db = getDB();
  const collection = db.collection("plants");
  return await collection.findOne({ _id: new ObjectId(id) });
};

module.exports = { getPlants, getPlantById };
