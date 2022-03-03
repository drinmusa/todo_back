const Task = require("../models/Task");

const taskService = {
  async saveTask(data, userID) {
    const { title, description, due_date, list, status } = data;

    return await new Task({
      author: userID,
      list,
      title,
      description,
      due_date,
      status,
    }).save();
  },
  async deleteTask(data, userID) {
    return await Task.findOneAndRemove({
      $and: [{ _id: data.taskID }, { author: userID }],
    });
  },
  async updateTask(data, userID) {
    return await Task.findOneAndUpdate(
      { $and: [{ _id: data.taskID }, { author: userID }] },
      { $: data },
      { new: true }
    );
  },
  async getTaskByID(data, userID) {
    return await Task.findOne({
      $and: [{ _id: data.taskID }, { author: userID }],
    });
  },
  async getTasks() {
    return await Task.find();
  },
};
module.exports = taskService;
