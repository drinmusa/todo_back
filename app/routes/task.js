const router = require("express").Router();
const passport = require("passport");

const taskController = require("../controllers/task");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  taskController.createTask
);
router.get(
  "/task",
  passport.authenticate("jwt", { session: false }),
  taskController.getTask
);
router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  taskController.getTasks
);
router.get(
  "/tasks/today",
  passport.authenticate("jwt", { session: false }),
  taskController.getTodaysTasks
);
router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  taskController.getTasksByList
);
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  taskController.updateTask
);
router.post(
  "/tasks/update",
  passport.authenticate("jwt", { session: false }),
  taskController.removeListFromTasks
);
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  taskController.deleteTask
);
module.exports = router;
