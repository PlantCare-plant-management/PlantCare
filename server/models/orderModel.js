const { getDB } = require("../config/mongoDb");
const { ObjectId } = require("mongodb");

const getOrderById = async (id) => {
    const db = getDB();
    const collection = db.collection("order");
    return await collection.findOne({ _id: new ObjectId(id) });
};

const createOrder = async (order) => {
    const db = getDB();
    const collection = db.collection("order");
    return await collection.insertOne(order);
};

const updateOrder = async (id, order) => {
    const db = getDB();
    const collection = db.collection("order");
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: order });
};

module.exports = {
    getOrderById, createOrder, updateOrder
}