const userService = require("../services/user");
const User = require("../models/User");
const { checkPassword } = require("../helpers/passwordHash");
const { createJwt } = require("../helpers/JwtCreation");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(422).json(errors);
    }

    const ExistingUser = await userService.userExists(req.body);
    if (ExistingUser) {
      return res.status(400).json({
        username: "This username already exists!",
      });
    }

    const user = await userService.storeUser(req.body);
    const { username, first_name, last_name } = user;

    return res.json({
      username,
      first_name,
      last_name,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(422).json(errors);
    }

    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).json({
        error: "Incorrect credentials!",
      });
    }

    const isPasswordCorrect = await checkPassword(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({
        error: "Incorrect credentials!",
      });
    }

    const token = await createJwt({
      id: user.id,
      username: user.username,
    });

    res.json({
      success: true,
      token: token,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
const changePassword = async (req, res) => {
  const isPasswordCorrect = await checkPassword(
    req.body.password,
    user.password
  );
  d;
};
const update = async (req, res) => {
  const ExistingUser = await userService.userExists(req.body);
  if (ExistingUser) {
    return res.status(400).json({
      username: "This username is taken!",
    });
  }
};
module.exports = {
  register,
  login,
  update,
};
