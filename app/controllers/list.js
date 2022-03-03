const { verify } = require("jsonwebtoken");
const secretKey = process.env.KEY || "1234567";

const listService = require("../services/list");

const validateListInput = require("../validation/list");

const createList = async (req, res) => {
  try {
    const { errors, isValid } = validateListInput(req.body, req.user.id);
    if (!isValid) {
      return res.status(422).json(errors);
    }
    const list = await listService.saveList(req.body, req.user.id);
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
  }
};
const getList = async (req, res) => {
  try {
    const list = await listService.getListByID(req.body, req.user.id);
    if (!list) {
      return res.status(404).json({
        error: "List doesnt exist",
      });
    }
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
  }
};
const getLists = async (req, res) => {
  try {
    const lists = await listService.getLists(req.user.id);

    if (lists.length == 0) {
      return res.status(404).json({
        error: "Lists doesnt exist",
      });
    }
    return res.status(200).json(lists);
  } catch (error) {
    console.log(error);
  }
};
const deleteList = async (req, res) => {
  try {
    const list = await listService.getListByID(req.body, req.user.id);
    if (!list) {
      return res.status(404).json({
        error: "List doesnt exist",
      });
    }

    const deletedList = await listService.deleteList(req.body, req.user.id);
    return res.status(200).json({
      message: "List deleted successfully",
      deletedList,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateList = async (req, res) => {
  try {
    const list = await listService.getListByID(req.body, req.user.id);
    if (!list) {
      return res.status(404).json({
        error: "List doesnt exist",
      });
    }
    const updatedList = await listService.updateList(req.body, req.user.id);
    return res.status(200).json({
      message: "List updated successfully",
      updatedList,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createList,
  getList,
  getLists,
  deleteList,
  updateList,
};
