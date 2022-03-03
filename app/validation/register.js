const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !! data.name ? data.name : '';
    data.email = !! data.email ? data.email : '';
    data.password = !! data.password ? data.password : '';
    data.confirm_password = !! data.confirm_password ? data.confirm_password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required.";
    } else if (! Validator.isEmail(data.email)) {
        errors.email = "Invalid email";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required.";
    } else if (! Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Name must be between 2 and 30 characters.";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required.";
    } else if (! Validator.isLength(data.password, {min: 6})) {
        errors.password = "Password must be a minimum of 6 characters."
    } else if (Validator.isEmpty(data.confirm_password)) {
        errors.password = "Password confirmation is required.";
    } else if (! Validator.equals(data.password, data.confirm_password)) {
        errors.password = "Passwords don't match.";
    }

    return {
        errors,
        isValid: Object.values(errors).length === 0
    }
}
