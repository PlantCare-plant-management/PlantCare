const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authentication = require("../middleware/authentication");


// untuk auth
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// untuk profile
router.get('/user', authentication, UserController.getUserById)

// untuk alamat pengiriman
router.post('/user/address', authentication, UserController.saveAddress)

// untuk riwayat pembelian
router.get('/user/payment', authentication, UserController.initiateMidtransTrx)

// untuk update status pembelian
router.post('/user/update_order', UserController.updateOrder)

module.exports = router;
