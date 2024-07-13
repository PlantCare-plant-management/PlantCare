import { MongoClient } from "mongodb";
const connectionString = "mongodb+srv://plant:ueeB3UBYBkopNVcZ@plant.nvdpzyd.mongodb.net/";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("PlantCare");
export default db;