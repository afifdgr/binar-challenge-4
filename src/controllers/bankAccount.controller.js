const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createAccount: async (req, res) => {
    let { bank_name, bank_account_number, balance, user_id } = req.body;
    balance = parseInt(balance);
    user_id = parseInt(user_id);

    try {
      const existingUser = await prisma.users.findUnique({
        where: { id: user_id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: true, message: "User Not Found" });
      }

      if (balance < 100000)
        return res
          .status(400)
          .json({ error: true, message: "Minimum Balance is 100000" });

      const response = await prisma.bank_accounts.create({
        data: {
          bank_name: bank_name,
          bank_account_number: bank_account_number,
          balance: balance,
          user: {
            connect: { id: user_id },
          },
        },
      });

      const balanceInt = balance;

      return res.status(201).json({
        error: false,
        message: "Create account Successfully",
        data: {
          ...response,
          balance: balanceInt,
        },
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await prisma.bank_accounts.findMany({
        include: {
          user: true,
          source_transaction: true,
          destination_transaction: true,
        },
      });

      if (!accounts)
        return res
          .status(404)
          .json({ error: true, message: "Account Not Found" });

      const response = accounts.map((account) => {
        return {
          bank_account_id: parseInt(account.id),
          bank_name: account.bank_name,
          balance: parseInt(account.balance),
          user_id: parseInt(account.user.id),
        };
      });

      return res.status(201).json({
        error: false,
        message: "Fetched data bank account successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },

  getAccountById: async (req, res) => {
    const { accountId } = req.params;

    try {
      const account = await prisma.bank_accounts.findUnique({
        where: {
          id: parseInt(accountId),
        },
        include: {
          user: true,
          source_transaction: true,
          destination_transaction: true,
        },
      });

      if (!account)
        return res
          .status(404)
          .json({ error: true, message: "Account Not Found" });

      const response = {
        bank_account_id: parseInt(account.id),
        bank_name: account.bank_name,
        balance: parseInt(account.balance),
        user_id: parseInt(account.user.id),
      };

      const transactions = await prisma.bank_account_transactions.findMany({
        where: {
          source_account_id: parseInt(account.id),
        },
        take: 5,
        orderBy: {
          id: "desc",
        },
      });

      const historyTransaction = transactions.map((transaction) => {
        return {
          transaction_id: parseInt(transaction.id),
          source_account: parseInt(transaction.source_account_id),
          destination_account: parseInt(transaction.destination_account_id),
          amount: parseInt(transaction.amount),
        };
      });

      return res.status(201).json({
        error: false,
        message: "Fetched data bank account successfully",
        data: response,
        latestTransaction: historyTransaction,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },
};
