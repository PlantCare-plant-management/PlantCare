const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
let db;

const connectDB = async () => {
  try {
    const client = new MongoClient("mongodb+srv://plant:ueeB3UBYBkopNVcZ@plant.nvdpzyd.mongodb.net");
    await client.connect();

    const dbName = process.env.NODE_ENV === 'test' ? 'testPlantCare2' : 'PlantCare2';
    db = client.db(dbName);
    console.log(`Connected to MongoDB - Database: ${dbName}`);
  } catch (err) {
    console.error(err);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected!");
  }
  return db;
};

module.exports = { connectDB, getDB };
