const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

// USER Route
router.post("/users", UserController.register);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);

module.exports = router;
