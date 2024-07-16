const mongose = require("mongoose");
const Schema = mongose.Schema;
const tokenSchema = new Schema({
  userId: {
    type: mongose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongose.model("token", tokenSchema);
module.exports = Token;
