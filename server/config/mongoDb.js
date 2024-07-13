// database.js
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("PlantCare");
    console.log("Connected to MongoDB");
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
