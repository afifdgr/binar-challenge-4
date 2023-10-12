const express = require("express");
const userRoutes = require("./user.routes");
const bankAccountRoutes = require("./bankAccount.routes");
const transactionRoutes = require("./transaction.routes");

const router = express.Router();

router.use("/api/v1", userRoutes);
router.use("/api/v1", bankAccountRoutes);
router.use("/api/v1", transactionRoutes);

module.exports = router;
