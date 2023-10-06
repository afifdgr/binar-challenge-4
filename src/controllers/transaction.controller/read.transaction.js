const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.bank_account_transactions.findMany();

    const response = transactions.map((transaction) => {
      return {
        ...transaction,
        amount: parseInt(transaction.amount),
      };
    });

    return res.status(201).json({
      error: false,
      message: "Fetched data transaction successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getTransactionsById = async (req, res) => {
  const { transactionsId } = req.params;

  try {
    const transaction = await prisma.bank_account_transactions.findUnique({
      where: {
        id: parseInt(transactionsId),
      },
    });

    if (!transaction)
      return res
        .status(404)
        .json({ error: true, message: "Transaction Not Found" });

    const response = {
      ...transaction,
      amount: parseInt(transaction.amount),
    };

    return res.status(201).json({
      error: false,
      message: "Fetched data transaction by id successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { getTransactions, getTransactionsById };
