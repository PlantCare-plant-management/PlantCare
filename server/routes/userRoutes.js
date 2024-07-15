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

module.exports = router;
