const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bank_accounts.findMany();

    const response = accounts.map((account) => {
      return {
        ...account,
        balance: parseInt(account.balance),
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
};

const getAccountById = async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await prisma.bank_accounts.findUnique({
      where: {
        id: parseInt(accountId),
      },
    });

    if (!account)
      return res
        .status(404)
        .json({ error: true, message: "Bank Account Not Found" });

    const response = {
      ...account,
      balance: parseInt(account.balance),
    };

    return res.status(201).json({
      error: false,
      message: "Fetched data bank account by id successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAccounts,
  getAccountById,
};
