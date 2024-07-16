const { comparePass, hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const crypto = require("crypto");

// firebase config
const storage = require("../config/firebase-config");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

const {
  getUsers,
  getUserById,
  createUser,
  getUserByUsername,
  getUserByEmail,
  editUser,
} = require("../models/userModel");
const { registerSchema, loginSchema } = require("../schemas/userSchema");
const { ObjectId } = require("mongodb");
const Token = require("../models/token");
class UserController {
  static async editUser(req, res, next) {
    try {
      const userId = new ObjectId(req.user.id);
      console.log(userId, "<=== userID");
      const body = req.body;

      const imgFile = req.file;

      if (!imgFile) {
        return res.status(400).send("No image file provided");
      }

      const filename = `${userId} - ${uuidv4()}`;

      const imageRef = ref(storage, filename);
      const snapshot = await uploadBytes(imageRef, imgFile.buffer);

      const imgUrl = await getDownloadURL(snapshot.ref);
      console.log(imgUrl, "<==== imgUrl dicontoler");
      const rawData = {
        name: body.name,
        email: body.email,
        password: hashPass(body.password),
        address: body.address,
        dateOfBirth: body.dateOfBirth,
        imgUrl: imgUrl,
      };

      console.log(rawData, "<=== raw data");

      const updatedUser = await editUser(userId, rawData);

      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error di edit:", error);
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const userId = req.user.id.toString();

      const user = await getUserById(userId);
      if (!user) {
        throw { name: "ITEM_NOT_FOUND" };
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, email, name } = registerSchema.parse(
        req.body
      );

      const existingUserByUsername = await getUserByUsername(username);
      if (existingUserByUsername) {
        throw { name: "USERNAME_ALREADY_EXISTS" };
      }

      const existingUserByEmail = await getUserByEmail(email);
      if (existingUserByEmail) {
        throw { name: "EMAIL_ALREADY_EXISTS" };
      }

      const hashedPassword = hashPass(password);
      const user = await createUser({
        name,
        email,
        username,
        password: hashedPassword,
      });

      const token = new Token({
        userId: user.insertedId,
        token: crypto.randomBytes(16).toString("hex"),
      });

      await token.save();
      console.log(token);

      res
        .status(201)
        .json({ message: "Success add user with username " + username });
    } catch (error) {
      console.error("Error in register:", error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await getUserByEmail(email);
      if (!user) {
        throw { name: "AUTH_NOT_VALID" };
      }

      const checkPass = comparePass(password, user.password);
      if (!checkPass) {
        throw { name: "AUTH_NOT_VALID" };
      }

      const access_token = signToken({ id: user._id, username: user.username });

      res.status(200).json({ access_token, username: user.username, email });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
