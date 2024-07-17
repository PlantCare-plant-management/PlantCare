const { verifyToken } = require("../helpers/jwt");
const ObjectId = require("mongodb").ObjectId;
const { getDB } = require("../config/mongoDb");

async function authentication(req, res, next) {
  try {
    const db = getDB();
    if (!req.headers.authorization) {
      throw { name: "UNAUTHORIZED" };
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = verifyToken(token);

    const user = await db
      .collection("user")
      .findOne({ _id: new ObjectId(payload.id) });

    if (!user) {
      throw { name: "UNAUTHORIZED" };
    }

    req.user = {
      id: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
