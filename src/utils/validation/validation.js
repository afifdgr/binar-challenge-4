const Joi = require("joi");
const ApiResponse = require("../apiResponse.utils");

const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};
module.exports = {
  register: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().max(255).required(),
      password: Joi.string().min(8).required(),
      identity_number: Joi.string().required(),
      identity_type: Joi.string().required(),
      address: Joi.string().required(),
    });

    try {
      await schema.validateAsync(req.body, { abortEarly: false, ...options });
      next();
    } catch (err) {
      return res.json(ApiResponse.errorValidation(err));
    }
  },
};
