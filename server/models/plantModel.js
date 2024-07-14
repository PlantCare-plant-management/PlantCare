const { getDB } = require('../config/mongoDb');

const ObjectId = require('mongodb').ObjectId;

const getPlants = async () => {
  const db = getDB();
  return await db.collection("plants").find().toArray();
};

const getPlantById = async (id) => {
  const db = getDB();
  const collection = db.collection("plants");
  return await collection.findOne({ _id: new ObjectId(id) });
};

const getMyPlant = async () => {
  const db = getDB();
  const collection = db.collection("myPlants");
  return await collection.aggregate([
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          userId: "6692846d0654ff8ff684e6bc"
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
}

module.exports = { getPlants, getPlantById, getMyPlant };
