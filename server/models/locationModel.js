const { getDB } = require("../config/mongoDb");
const { ObjectId } = require("mongodb");

const getLocation = async (id) => {
  const db = getDB();
  return await db.collection("locations").aggregate([
    {
      $match:
        {
          userId: id
        }
    }
  ]).toArray();
};

const addLocation = async (name, userId) => {
  const db = getDB();
  return await db.collection("locations").insertOne({ name, userId });
};

const updateLocation = async (id, newName) => {
  const db = getDB();
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { name: newName },
  };
  const result = await db.collection("locations").updateOne(query, updateDoc);

  if (result.modifiedCount === 0) {
    throw new Error("Failed to update location");
  }

  return { _id: id, name: newName };
};

module.exports = { getLocation, addLocation, updateLocation };