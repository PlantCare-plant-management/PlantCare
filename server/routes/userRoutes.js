const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");


// untuk auth
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// untuk profile
router.get('/user/:id', UserController.getUserById)

module.exports = router;
