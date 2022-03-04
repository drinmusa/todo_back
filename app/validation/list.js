const Validator = require("validator");

module.exports = (data) => {
  data.title = !!data.title ? data.title : "";
  // data.description = !!data.description ? data.description : "";
  let errors = {};
  if (Validator.isEmpty(data.title)) {
    errors.title = "List title is required";
  }
  return {
    errors,
    isValid: Object.values(errors).length === 0,
  };
};
