const User = require("../models/User");
const helpers = require("../helpers/passwordHash");

const userService = {
  async storeUser(data) {
    const { username, password, first_name, last_name } = data;

    const hashedPassword = await helpers.hashPassword(password);

    return await new User({
      username,
      first_name,
      last_name,
      password: hashedPassword,
    }).save();
  },
	async userExists(data) {
    return await User.findOne({
      username: data.username,
    });
  },
	async getUserByID(data) {
    return await User.findOne({
      _id: data,
    });
  },
  async UpdateProfile(data) {
    return await User.findOneAndUpdate(
      { user: data.id },
      { $set: data },
      { new: true }
    );
  },
  async deleteUser(userId) {
    await User.findOneAndRemove({
      _id: userId,
    });
  },


  async changePassword(data) {
    const hashedPassword = await helpers.hashPassword(data);
    return await User.findOneAndUpdate({
      user: data._id,
      $set: {
        password: hashedPassword,
      },
    });
  },
};
module.exports = userService;