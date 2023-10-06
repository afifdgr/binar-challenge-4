const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createAccount = async (req, res) => {
  const { bank_name, bank_account_number, balance, user_id } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: parseInt(user_id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: true, message: "User Not Found" });
    }

    const existingAccount = await prisma.bank_accounts.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    if (existingAccount) {
      return res
        .status(404)
        .json({ error: true, message: "Bank Account Registered" });
    }

    const balanceInt = parseInt(balance);

    const response = await prisma.bank_accounts.create({
      data: {
        bank_name: bank_name,
        bank_account_number: bank_account_number,
        balance: BigInt(balance),
        user: {
          connect: { id: parseInt(user_id) },
        },
      },
    });

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
};

module.exports = {
  createAccount,
};
