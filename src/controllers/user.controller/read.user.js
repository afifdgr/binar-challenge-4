const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        profile: true,
        bank_accounts: true,
      },
    });

    if (!users)
      return res.status(404).json({
        error: true,
        message: "User Not Found",
      });

    const response = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profiles: {
        identity_type: user.profile.identity_type,
        identity_number: user.profile.identity_number,
        address: user.profile.address,
      },
      bank_accounts: user.bank_accounts.map((account) => ({
        bank_name: account.bank_name,
        bank_account_number: account.bank_account_number,
        balance: parseInt(account.balance),
      })),
    }));

    return res.status(200).json({
      error: false,
      message: "Successfully fetched data all user",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        profile: true,
        bank_accounts: true,
      },
    });

    if (!user)
      return res.status(404).json({
        error: true,
        message: "User Not Found",
      });

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      profiles: {
        identity_type: user.profile.identity_type,
        identity_number: user.profile.identity_number,
        address: user.profile.address,
      },
      bank_accounts: user.bank_accounts.map((account) => ({
        id: account.id,
        bank_name: account.bank_name,
        bank_account_number: account.bank_account_number,
        balance: parseInt(account.balance),
      })),
    };

    return res.status(200).json({
      error: false,
      message: "Successfully fetched data user by id",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
