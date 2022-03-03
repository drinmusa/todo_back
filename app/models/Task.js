const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lists",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // required: true,
  },
  due_date: {
    type: Date,
    // required: true,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
