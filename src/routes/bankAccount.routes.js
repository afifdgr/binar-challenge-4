const express = require("express");
const BankAccountController = require("../controllers/bankAccount.controller");

const router = express.Router();

// ACCOUNT Route
router.post("/accounts", BankAccountController.createAccount);
router.get("/accounts", BankAccountController.getAccounts);
router.get("/accounts/:accountId", BankAccountController.getAccountById);

module.exports = router;
