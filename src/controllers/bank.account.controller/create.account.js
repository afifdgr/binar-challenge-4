const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createAccount = async (req, res) => {
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
};

module.exports = {
  createAccount,
};
