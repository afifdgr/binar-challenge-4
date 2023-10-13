const express = require("express");
const UserController = require("../controllers/user.controller");
const Validation = require("../utils/validation/validation");

const router = express.Router();

// USER Route
router.post("/users", Validation.register, UserController.register);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
