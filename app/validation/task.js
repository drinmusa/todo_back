const Validator = require("validator");

module.exports = (data) => {
  data.title = !!data.title ? data.title : "";
  data.description = !!data.description ? data.description : "";
  data.date = !!data.date ? data.date : "";
  let errors = {};
  if (Validator.isEmpty(data.title)) {
    errors.title = "Task title is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date is required";
  }
  return {
    errors,
    isValid: Object.values(errors).length === 0,
  };
};
