const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

const client = new MongoClient(process.env.MONGO_URI);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    await client.close();
  }
}

async function getDB() {
  // if (!client.topology.isConnected()) {
  //   await connect();
  // }
  return client.db("PlantCare");
}

module.exports = { connect, getDB };
