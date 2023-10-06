const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.users.findMany();
  return res.status(200).json({
    error: false,
    message: "Successfully fetched all data",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    const profile = await prisma.profiles.findUnique({
      where: {
        user_id: parseInt(user.id),
      },
    });

    const bank_account = await prisma.bank_accounts.findUnique({
      where: {
        user_id: parseInt(user.id),
      },
    });

    const response = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      profile: {
        identity_number: profile.identity_number,
        identity_type: profile.identity_type,
        address: profile.address,
      },
      bank_accounts: {
        bank_name: bank_account.bank_name,
        bank_account_number: bank_account.bank_account_number,
        balance: parseInt(bank_account.balance),
      },
    };

    return res.status(200).json({
      error: false,
      message: "Successfully fetched data user by id",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
