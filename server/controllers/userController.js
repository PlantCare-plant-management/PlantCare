const { comparePass, hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  getUsers,
  getUserById,
  createUser,
  getUserByUsername,
  getUserByEmail,
} = require("../models/userModel");
const { registerSchema, loginSchema } = require("../schemas/userSchema");

class UserController {
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
      const user = await getUserById(req.params.id);
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
      res
        .status(201)
        .json({ message: "Success add user with username " + username });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      console.log(email, password)

      const user = await getUserByEmail(email);
      if (!user) {
        throw { name: "AUTH_NOT_VALID" };
      }

      const checkPass = comparePass(password, user.password);
      if (!checkPass) {
        throw { name: "AUTH_NOT_VALID" };
      }

      const access_token = signToken({ id: user._id, username: user.username });

      res
        .status(200)
        .json({ access_token, username: user.username, email, id: user._id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
