const { PrismaClient } = require("@prisma/client");
const ApiResponse = require("../utils/apiResponse.utils");

const {
  incrementBalance,
  decrementBalance,
} = require("../utils/transaction.utils");

const prisma = new PrismaClient();

module.exports = {
  createTransaction: async (payload) => {
    try {
      let { source_account_id, destination_account_id, amount } = payload;
      source_account_id = parseInt(source_account_id);
      destination_account_id = parseInt(destination_account_id);
      amount = parseInt(amount);

      const existingSourceAccount = await prisma.bank_accounts.findUnique({
        where: {
          id: source_account_id,
        },
      });

      if (!existingSourceAccount)
        return ApiResponse.error("Source Account Not Found");

      if (existingSourceAccount.balance < amount)
        return ApiResponse.error("Source Account balance is insufficient");

      const existingDestinationAccount = await prisma.bank_accounts.findUnique({
        where: {
          id: destination_account_id,
        },
      });

      if (!existingDestinationAccount)
        return ApiResponse.error("Destination Account Not Found");

      await prisma.bank_account_transactions.create({
        data: {
          amount: amount,
          source_account: { connect: { id: source_account_id } },
          destination_account: {
            connect: { id: destination_account_id },
          },
        },
      });

      await decrementBalance(source_account_id, amount);
      await incrementBalance(destination_account_id, amount);

      const data = {
        source_account_id: source_account_id,
        destination_account_id: destination_account_id,
        amount: amount,
      };

      return ApiResponse.success("Transaction Successfully", data);
    } catch (error) {
      console.log(error);
      return ApiResponse.error("Internal Server Error");
    }
  },

  getTransactions: async () => {
    try {
      const transactions = await prisma.bank_account_transactions.findMany({
        include: {
          source_account: true,
          destination_account: true,
        },
      });

      const data = transactions.map((transaction) => ({
        transaction_id: parseInt(transaction.id),
        source_account: parseInt(transaction.source_account_id),
        destination_account: parseInt(transaction.destination_account_id),
        amount: parseInt(transaction.amount),
      }));

      return ApiResponse.success(
        "Fetched Data All Transaction Successfully",
        data
      );
    } catch (error) {
      console.log(error);
      return ApiResponse.error("Internal Server Error");
    }
  },

  getTransactionById: async (req) => {
    try {
      const { transactionsId } = req.params;

      const transaction = await prisma.bank_account_transactions.findUnique({
        where: {
          id: parseInt(transactionsId),
        },
        include: {
          source_account: true,
          destination_account: true,
        },
      });

      if (!transaction) return ApiResponse.error("Transaction Not Found");

      const data = {
        transaction_id: parseInt(transaction.id),
        source_account: parseInt(transaction.source_account_id),
        destination_account: parseInt(transaction.destination_account_id),
        amount: parseInt(transaction.amount),
      };

      return ApiResponse.success(
        "Fetched Data All Transaction Successfully",
        data
      );
    } catch (error) {
      console.log(error);
      return ApiResponse.error("Internal Server Error");
    }
  },
};
