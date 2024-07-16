const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authentication = require("../middleware/authentication");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// untuk auth
router.post("/login", UserController.login);
router.post("/register", UserController.register);

// untuk profile
router.get("/user", authentication, UserController.getUserById);

// untuk edit
router.put(
  "/user/edit",
  authentication,
  upload.single("imgUrl"),
  UserController.editUser
);

module.exports = router;
