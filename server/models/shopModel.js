const { getDB } = require("../config/mongoDb");

const ObjectId = require("mongodb").ObjectId;

const getPlantsFromMarket = async () => {
  const db = getDB();
  const collection = db.collection("plantMarket");
  return await collection.find().toArray();
};

const getPlantsFromMarketById = async (id) => {
  const db = getDB();
  const collection = db.collection("plantMarket");
  return await collection.findOne({ _id: new ObjectId(id) });
};

module.exports = { getPlantsFromMarket, getPlantsFromMarketById };
