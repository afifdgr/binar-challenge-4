const UserService = require("../services/user.service");

module.exports = {
  register: async (req, res) => {
    try {
      const serviceResponse = await UserService.register(req.body);
      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const serviceResponse = await UserService.getUsers();
      return res.json(serviceResponse);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const serviceResponse = await UserService.getUserById(req);
      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
};
