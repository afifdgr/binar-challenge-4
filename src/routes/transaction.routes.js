const express = require("express");
const TransactionController = require("../controllers/transaction.controller");

const router = express.Router();

// TRANSACTION Route
router.post("/transactions", TransactionController.createTransaction);
router.get("/transactions", TransactionController.getTransactions);
router.get(
  "/transactions/:transactionsId",
  TransactionController.getTransactionsById
);

module.exports = router;
