import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI;

if (!connectionString) {
  throw new Error("Connection string not found");
}

let client: MongoClient;

export const getMongoClientInstance = async () => {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }

  return client;
};

