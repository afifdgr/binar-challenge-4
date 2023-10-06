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
router.post("/accounts", createAccount);
router.get("/accounts", getAccounts);
router.get("/accounts/:accountId", getAccountById);

module.exports = router;
