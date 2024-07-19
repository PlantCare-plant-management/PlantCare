const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authentication = require("../middleware/authentication");
const multer = require("multer");
const { TransactionController } = require("../controllers/paymentController");

const upload = multer({ storage: multer.memoryStorage() });

// untuk auth
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// untuk profile
router.get('/user', authentication, UserController.getUserById)

// untuk alamat pengiriman
router.post('/user/address', authentication, UserController.saveAddress)

// untuk payment
router.post('/user/payment', authentication, TransactionController.createTransaction)
// router.post('/user/notification', PaymentController.handleNotification)


// untuk edit
router.put(
    "/user/edit",
    authentication,
    upload.single("imgUrl"),
    UserController.editUser
  );

module.exports = router;
