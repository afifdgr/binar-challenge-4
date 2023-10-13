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
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const serviceResponse = await UserService.updateUser(id, payload);

      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }

      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const serviceResponse = await UserService.deleteUser(req);

      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }

      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },
};
