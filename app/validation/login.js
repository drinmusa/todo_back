const Validator = require("validator");

module.exports = (data) => {
  data.username = !!data.username ? data.username : "";
  data.password = !!data.password ? data.password : "";

  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid: Object.values(errors).length === 0,
  };
};
