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
      { $set: data },
      { new: true }
    );
  },
  async getTaskByID(data, userID) {
    return await Task.findOne({
      $and: [{ _id: data.taskID }, { author: userID }],
    });
  },
  async getTasks(userID) {
    return await Task.find({
      author: userID,
    });
  },
  async getTasksByList(data, userID) {
    return await Task.find({
      $and: [{ list: data.list }, { author: userID }],
    });
  },
  async getTodaysTasks(userID) {
    return await Task.find({
      $and: [{ author: userID }, { due_date: new Date().toISOString() }],
    });
  },
  async removeListFromTasks(data, userID) {
    return await Task.updateMany(
      { $and: [{ author: userID }, { list: data.list }] },
      { $unset: { list: "" } }
    );
  },
};
module.exports = taskService;
