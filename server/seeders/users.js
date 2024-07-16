if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { MongoClient } = require("mongodb");
const { hashPass } = require("../helpers/bcrypt");

const client = new MongoClient(process.env.MONGO_URI);
const user_data = require("../data/userData.json");

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const database = client.db("PlantCare");
    const userCollection = database.collection("user");

    // Hash password for each user
    const hashedUsers = user_data.users.map((user) => ({
      ...user,
      password: hashPass(user.password),
    }));

    const result = await userCollection.insertMany(hashedUsers);
    console.log(`${result.insertedCount} documents were inserted`);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedDatabase().catch((err) => {
  console.error("Unhandled error:", err);
});
