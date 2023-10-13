const { PrismaClient } = require("@prisma/client");
const HashData = require("../utils/hashData.utils");
const prisma = new PrismaClient();

const ApiResponse = require("../utils/apiResponse");

module.exports = {
  register: async (payload) => {
    try {
      const { name, email, password, identity_number, identity_type, address } =
        payload;

      const existingEmail = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (existingEmail) return ApiResponse.error("Email Already Register");

      const hashedPassword = await HashData.create(password);
      const user = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          profile: {
            create: {
              identity_number: identity_number,
              identity_type: identity_type,
              address: address,
            },
          },
        },
      });
      user.password = undefined;
      return ApiResponse.success("Register User Successfully", user);
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  },

  getUsers: async () => {
    try {
      const users = await prisma.users.findMany({
        include: {
          profile: true,
          bank_accounts: true,
        },
      });

      const data = users.map((user) => ({
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

      return ApiResponse.success("Fetched data all user successfully", data);
    } catch (error) {
      console.log(error);
    }
  },

  getUserById: async (req) => {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          profile: true,
          bank_accounts: true,
        },
      });

      if (!user) {
        const serviceResponse = ApiResponse.error("User Not Found");
        return serviceResponse;
      }

      const data = {
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

      return ApiResponse.success("Fetched data user by id successfully", data);
    } catch (error) {
      console.log(error);
    }
  },
};
