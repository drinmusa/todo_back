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
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  taskController.updateTask
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  taskController.deleteTask
);
module.exports = router;
