const UserService = require("../services/user.service");
const ApiResponse = require("../utils/apiResponse");

module.exports = {
  register: async (req, res) => {
    try {
      const serviceResponse = await UserService.register(req.body);
      if (serviceResponse.error) {
        return res.json(ApiResponse.error(serviceResponse.error));
      }
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
      return res.json(error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const serviceResponse = await UserService.getUserById(req);
      if (serviceResponse.error) {
        return res.json(ApiResponse.error(serviceResponse.error));
      }
      return res.json({ data: serviceResponse });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
};
