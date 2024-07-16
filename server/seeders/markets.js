if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { MongoClient } = require("mongodb");
const productData = require("../data/marketData.json"); // Adjust the path as needed

const client = new MongoClient(process.env.MONGO_URI);


async function seedDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected correctly to server");

    // Get database and collection
    const database = client.db("PlantCare");
    const productCollection = database.collection("plantMarket");

    // Clear existing products
    await productCollection.deleteMany({});
    console.log("Existing products removed");

    // Insert new products
    const result = await productCollection.insertMany(productData);
    console.log(`${result.insertedCount} products were inserted`);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Close connection
    await client.close();
  }
}

seedDatabase().catch((err) => {
  console.error("Unhandled error:", err);
});
