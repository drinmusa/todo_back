const router = require("express").Router();
const passport = require("passport");

const listController = require("../controllers/list");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  listController.createList
);
router.post(
  "/list",
  passport.authenticate("jwt", { session: false }),
  listController.getList
);
router.get(
  "/lists",
  passport.authenticate("jwt", { session: false }),
  listController.getLists
);
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  listController.updateList
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  listController.deleteList
);
module.exports = router;
