const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path'); // Correctly import path module

// MongoDB connection string
const uri = 'mongodb+srv://plant:ueeB3UBYBkopNVcZ@plant.nvdpzyd.mongodb.net/'; // Replace with your MongoDB connection string

// Path to the data file
const dataFilePath = path.join(__dirname, 'data.json'); // Adjust the file name if necessary

// Read data from the JSON file
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    process.exit(1);
  }
};

// Seed data into MongoDB
const seedData = async (client, data) => {
  try {
    const database = client.db('PlantCare'); // Replace with your database name
    const collection = database.collection('testPlant'); // Replace with your collection name

    // Insert data
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted.`);
  } catch (err) {
    console.error('Error inserting data:', err);
  }
};

// Main function
const main = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const data = readDataFromFile(dataFilePath);
    await seedData(client, data);
  } finally {
    await client.close();
  }
};

main().catch(console.error);
