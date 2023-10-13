const { PrismaClient } = require("@prisma/client");
const UserService = require("../services/user.service");

const prisma = new PrismaClient();

module.exports = {
  register: async (req, res) => {
    try {
      const serviceResponse = await UserService.register(req.body);
      const apiResponse = {
        name: serviceResponse.name,
        email: serviceResponse.email,
      };
      return res
        .status(201)
        .json({ message: "Register Successfully", data: apiResponse });
    } catch (error) {
      console.log(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const serviceResponse = await UserService.getUsers();
      return res.json({ data: serviceResponse });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const serviceResponse = await UserService.getUserById(req);
      return res.json({ data: serviceResponse });
    } catch (error) {
      console.log(error);
    }
  },
};
