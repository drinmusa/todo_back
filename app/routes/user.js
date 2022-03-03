const router = require("express").Router();

const userController = require("../controllers/user");
const taskController = require("../controllers/task");

router.post("/register", userController.register);
router.post("/login", userController.login);
// router.post("/todos", taskController.getTasks);
module.exports = router;
