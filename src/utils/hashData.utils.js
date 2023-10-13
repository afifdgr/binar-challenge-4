const bcrypt = require("bcrypt");

module.exports = {
  create: async (data, saltRounds = 10) => {
    try {
      const hashedData = await bcrypt.hash(data, saltRounds);
      return hashedData;
    } catch (error) {
      console.log(error);
    }
  },
};
