const express = require("express");
const {
  createTransaction,
} = require("../../controllers/transaction.controller/create.transaction");
const {
  getTransactions,
  getTransactionsById,
} = require("../../controllers/transaction.controller/read.transaction");

const router = express.Router();

// TRANSACTION Route
router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:transactionsId", getTransactionsById);

module.exports = router;
