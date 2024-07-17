const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoDb");

const editUser = async (userId, user) => {
  const db = getDB();
  return await db
    .collection("user")
    .findOneAndUpdate(
      { _id: userId },
      { $set: user },
      { ReturnDocument: "after" }
    );
};


const getUsers = async () => {
  const db = getDB();
  return await db.collection("user").find().toArray();
};

const getUserById = async (id) => {
  const db = getDB();
  return await db.collection("user").findOne({ _id: new ObjectId(id) });
};

const createUser = async (user) => {
  const db = getDB();
  return await db.collection("user").insertOne(user);
};

const saveAddress = async (id,address) => {
  const db = getDB();
  return await db.collection("user").updateOne({ _id: new ObjectId(id) }, { $set: { address } });
};

const getUserByUsername = async (username) => {
  const db = getDB();
  return await db.collection("user").findOne({ username });
};

const getUserByEmail = async (email) => {
  const db = getDB();
  return await db.collection("user").findOne({ email });
};

module.exports = { getUsers, getUserById, createUser, saveAddress, getUserByUsername, getUserByEmail, editUser };
