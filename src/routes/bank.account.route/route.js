const express = require("express");
const {
  createAccount,
} = require("../../controllers/bank.account.controller/create.account");
const {
  getAccounts,
  getAccountById,
} = require("../../controllers/bank.account.controller/read.account");

const router = express.Router();

// ACCOUNT Route
router.post("/account", createAccount);
router.get("/account", getAccounts);
router.get("/account/:accountId", getAccountById);

module.exports = router;
