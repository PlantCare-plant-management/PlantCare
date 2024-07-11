if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);
const plant_data = require('./plantsdata.json');

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const database = client.db("PlantCare");
    const plantCollection = database.collection("plants");

    const result = await plantCollection.insertMany(plant_data);
    console.log(`${result.insertedCount} documents were inserted`);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(err => {
  console.error("Unhandled error:", err);
});
