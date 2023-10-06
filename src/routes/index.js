const express = require("express");
const userRoutes = require("./user.route/route.js");
const bankAccountRoutes = require("./bank.account.route/route.js");

const router = express.Router();

router.use("/api/v1", userRoutes);
router.use("/api/v1", bankAccountRoutes);

module.exports = router;
