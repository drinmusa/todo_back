const { verify } = require("jsonwebtoken");
const secretKey = process.env.KEY || "1234567";

const taskService = require("../services/task");

const validateTaskInput = require("../validation/task");

const createTask = async (req, res) => {
  try {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(422).json(errors);
    }
    const task = await taskService.saveTask(req.body, req.user.id);

    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await taskService.getTaskByID(req.body, req.user.id);
    if (!task) {
      return res.status(404).json({
        error: "Task doesnt exist",
      });
    }
    const deletedTask = await taskService.deleteTask(req.body, req.user.id);
    return res.status(200).json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await taskService.getTaskByID(req.body, req.user.id);
    if (!task) {
      return res.status(404).json({
        error: "Task doesnt exist",
      });
    }
    const updatedTask = await taskService.updateTask(req.body, req.user.id);
    return res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    console.log(error);
  }
};
const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskByID(req.body, req.user.id);
    if (!task) {
      return res.status(404).json({
        error: "Task doesnt exist",
      });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.id);
    if (!tasks) {
      return res.status(404).json({
        message: "No available tasks",
      });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};
const getTodaysTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTodaysTasks(req.user.id);
    if (!tasks) {
      return res.status(404).json({
        message: "No tasks due for today",
      });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};
const getTasksByList = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByList(req.body, req.user.id);
    if (tasks.length == 0) {
      return res.status(404).json({
        message: "No tasks in this list",
      });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};
const removeListFromTasks = async (req, res) => {
  try {
    const updatedTasks = await taskService.removeListFromTasks(
      req.body,
      req.user.id
    );
    if (!updatedTasks) {
      return res.status(404).json({
        message: "No tasks in this llist",
      });
    }
    return updatedTasks;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getTask,
  getTasks,
  getTodaysTasks,
  getTasksByList,
  removeListFromTasks,
};
