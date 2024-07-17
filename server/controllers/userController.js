const { comparePass, hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  getUsers,
  getUserById,
  createUser,
  getUserByUsername,
  getUserByEmail,
  saveAddress
} = require("../models/userModel");
const { registerSchema, loginSchema } = require("../schemas/userSchema");
const { createOrder, getOrderById } = require("../models/orderModel");
const midtransClient = require('midtrans-client');
const PlantController = require("./plantController");
const { getPlantsFromMarketById } = require("../models/plantModel");
const { ObjectId } = require("mongodb");




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
      const userId = req.user.id.toString()

      const user = await getUserById(userId);
      if (!user) {
        throw { name: "ITEM_NOT_FOUND" };
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async saveAddress(req, res, next) {
    try {
      const { address } = req.body;
      const userId = req.user.id.toString()
      const user = await saveAddress(userId, address);
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

  static async initiateMidtransTrx(req, res, next) {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
      });

      const _id = req.body.plantMarketId;

      // const orderId = Math.random().toString();
      const orderId = new ObjectId();
      const plantMarket = await getPlantsFromMarketById(_id); 
      console.log(plantMarket, "<<<<<");
      const amount = plantMarket.price;
      const userId = req.user.id;
      const user = await getUserById(userId);

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          name: user.name,
          email: user.email,
          address: user.address
        }
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      const order = {
        _id: orderId,
        amount: amount,
        userId: req.user.id,
        plantMarketId: _id,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await createOrder(order);

      res.json({ msg: "Order Created", transactionToken, orderId });
    } catch (error) {
      console.log(error, "<<< error midtrans");
      next(error);
    }
  }

  static async updateOrder(req, res) {
    try {
      const { orderId, status } = req.body;
      console.log(`Received notification for order_id: ${orderId}, transaction_status: ${status}`);
      const db = getDb();
  
      const transaction = await db.collection('order').findOne({ _id: orderId });
      if (!transaction) {
        return res.status(404).send({ message: 'Transaction not found' });
      }
  
      await db.collection('order').updateOne(
        { _id: transaction._id },
        { $set: { status: status, updatedAt: new Date() } }
      );
  
      if (status === 'settlement') {
        await db.collection('order').updateOne(
          { _id: transaction._id },
          { $push: { player: { _id: transaction.userId, username: req.user.username } } }
        );
      }
  
      res.status(200).send({ message: 'Transaction status updated' });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = UserController;
