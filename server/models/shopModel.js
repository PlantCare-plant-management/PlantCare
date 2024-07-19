const { getDB } = require("../config/mongoDb");

const ObjectId = require("mongodb").ObjectId;

const getPlantsFromMarket = async () => {
  const db = getDB();
  const collection = db.collection("plantMarket");
  return await collection.find().toArray();
};

const getPlantsFromMarketById = async (id) => {
  const db = getDB();
  const collection = db.collection("plantMarket");
  return await collection.findOne({ _id: new ObjectId(id) });
};

const getOrderHistory = async (userId) => {
  const db = getDB();
  const orderCollection = db.collection("order");
  const plantMarketCollection = db.collection("plantMarket");

  const pipeline = [
    {
      $match: { userId: new ObjectId(userId) }
    },
    {
      $lookup: {
        from: 'plantMarket',
        localField: 'plantMarketId',
        foreignField: '_id',
        as: 'plant'
      }
    },
    {
      $unwind: '$plant'
    }
  ];

  return await orderCollection.aggregate(pipeline).toArray();
};

const updateOrderStatus = async (id) => {
  const db = getDB();
  const result = await db.collection("order").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status: "Success" } },
    { returnDocument: 'after' }
  );
  return result.value;
};

const createOrder = async (order) => {
  const db = await getDB(process.env.MONGO_URI);
  return db.collection("order").insertOne(order);
};  


module.exports = {
  getPlantsFromMarket,
  getPlantsFromMarketById,
  getOrderHistory,
  updateOrderStatus,
  createOrder
};
