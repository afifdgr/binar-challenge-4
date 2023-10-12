const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

module.exports = {
  register: async (req, res) => {
    const { name, email, password, identity_number, identity_type, address } =
      req.body;

    if (!name)
      return res.status(400).json({ error: true, message: "name is required" });

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    } else if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email format" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    } else if (password.length < 8) {
      return res.status(400).json({
        error: true,
        message: "Password must be at least 8 characters long",
      });
    }

    if (!identity_number)
      return res
        .status(400)
        .json({ error: true, message: "identity_number is required" });

    if (!identity_type)
      return res
        .status(400)
        .json({ error: true, message: "identity_type is required" });

    if (!address)
      return res
        .status(400)
        .json({ error: true, message: "address is required" });

    const existingEmail = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (existingEmail)
      return res
        .status(400)
        .json({ error: true, message: "Email already registered" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const user = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
          profile: {
            create: {
              identity_number: identity_number,
              identity_type: identity_type,
              address: address,
            },
          },
        },
      });

      const response = {
        ...user,
      };

      return res.status(201).json({
        error: false,
        message: "register user Successfully ",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },

  getUsers: async (req, res) => {
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
  },

  getUserById: async (req, res) => {
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
  },
};
