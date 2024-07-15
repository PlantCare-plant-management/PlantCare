const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authentication = require("../middleware/authentication");


// untuk auth
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// untuk profile
router.get('/user', authentication, UserController.getUserById)

module.exports = router;
