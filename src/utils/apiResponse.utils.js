const errorsCustomMessage = (errors) =>
  errors.details.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.path]: curr.message,
    }),
    {}
  );

module.exports = {
  success: (msg, data) => {
    const response = {};
    response.error = false;
    response.message = msg;
    response.data = data;

    return response;
  },
  error: (msg) => {
    const response = {};
    response.error = true;
    response.message = msg;

    return response;
  },

  errorValidation: (errors) => {
    const result = {};
    result.message = "The given data was invalid.";
    result.errors = errorsCustomMessage(errors);

    return result;
  },
};
