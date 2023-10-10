const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.bank_account_transactions.findMany({
      include: {
        source_account: true,
        destination_account: true,
      },
    });

    if (!transactions)
      return res
        .status(404)
        .json({ error: true, message: "Transaction Not Found" });

    const response = transactions.map((transaction) => {
      return {
        transaction_id: parseInt(transaction.id),
        source_account: parseInt(transaction.source_account_id),
        destination_account: parseInt(transaction.destination_account_id),
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
      include: {
        source_account: true,
        destination_account: true,
      },
    });

    if (!transaction)
      return res
        .status(404)
        .json({ error: true, message: "Transaction Not Found" });

    const response = {
      transaction_id: parseInt(transaction.id),
      source_account: parseInt(transaction.source_account_id),
      destination_account: parseInt(transaction.destination_account_id),
      amount: parseInt(transaction.amount),
    };

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

/* const getTransactionsById = async (req, res) => {
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
 */
module.exports = { getTransactions, getTransactionsById };
