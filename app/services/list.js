const List = require("../models/List");

const listService = {
  async saveList(data, userID) {
    const { title, description } = data;

    return await new List({
      author: userID,
      title,
      description,
    }).save();
  },
  async editList(data, userID) {
    return await List.findOneAndUpdate(
      { $and: [{ _id: data.listID }, { author: userID }] },
      { $: data },
      { new: true }
    );
  },
  async deleteList(data, userID) {
    return await List.findOneAndRemove({
      $and: [{ _id: data.listID }, { author: userID }],
    });
  },
  async getListByID(data, userID) {
    return await List.findOne({
      $and: [{ _id: data.listID }, { author: userID }],
    });
  },
  async getLists(userID) {
    return await List.find({
      author: userID,
    });
  },
};
module.exports = listService;
