const { getDB } = require("../config/mongoDb");

const ObjectId = require("mongodb").ObjectId;

const getPlants = async () => {
  const db = getDB();
  return await db.collection("testPlant").find().toArray();
};

const getPlantById = async (id) => {
  const db = getDB();
  const collection = db.collection("plants");
  return await collection.findOne({ _id: new ObjectId(id) });
};

const addToMyPlant = async (plant) => {
  const db = getDB();
  const collection = db.collection("myPlants");
  return await collection.insertOne(plant);
};

const getMyPlants = async (id) => {
  const db = getDB();
  const collection = db.collection("myPlants");
  return await collection.aggregate([
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          userId: id
        }
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "plants",
          localField: "plantId",
          foreignField: "_id",
          as: "plants"
        }
    },
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */
        {
          path: "$plants"
        }
    }
  ]).toArray()
};

const updateMyPlant = async(plantId, action) => {
  const db = getDB()
  const collection = db.collection("myPlants")
  console.log(action, plantId)
  const result = await collection.updateOne({_id: new ObjectId(plantId)},
    {
      $set: {actions: action}
    }
  )
  console.log(result.modifiedCount)
  if (result.matchedCount === 0) {
    console.log("No document found with the provided plantId");
  }
  return result.modifiedCount
}

const seed = async(data) => {
  const db = getDB()
  const collection = db.collection("testPlant")
  const result = await collection.insertMany(data)
  return result
}

module.exports = { getPlants, getPlantById, addToMyPlant, getMyPlants, updateMyPlant, seed };