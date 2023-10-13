const AccountService = require("../services/bankAccount.service");

module.exports = {
  createAccount: async (req, res) => {
    try {
      const serviceResponse = await AccountService.createAccount(req.body);
      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },

  getAccounts: async (req, res) => {
    try {
      const serviceResponse = await AccountService.getAccounts();
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },

  getAccountById: async (req, res) => {
    try {
      const serviceResponse = await AccountService.getAccountById(req);
      if (serviceResponse.error) {
        return res.json(serviceResponse);
      }
      return res.json(serviceResponse);
    } catch (error) {
      console.log(error);
    }
  },
};
