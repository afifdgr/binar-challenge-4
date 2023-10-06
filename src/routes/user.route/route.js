const express = require("express");
const { register } = require("../../controllers/user.controller/create.user");
const {
  getUsers,
  getUserById,
} = require("../../controllers/user.controller/read.user");
const router = express.Router();

// USER Route
router.post("/users", register);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

module.exports = router;
