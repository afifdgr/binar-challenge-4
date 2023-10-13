const TransactionService = require("../services/transaction.service");

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const serviceResponse = await TransactionService.createTransaction(
        req.body
      );
      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },
  getTransactions: async (req, res) => {
    try {
      const serviceResponse = await TransactionService.getTransactions();
      return res.json(serviceResponse);
    } catch (error) {
      console.error(error);
    }
  },

  getTransactionsById: async (req, res) => {
    try {
      const serviceResponse = await TransactionService.getTransactionById(req);
      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },
};
