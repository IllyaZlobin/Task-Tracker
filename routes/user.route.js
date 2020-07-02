const express = require("express");
const controller = require("../controllers/user.controller");
const asyncMiddleware = require("../middlewares/asyncMiddleware");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { userList } = require("../validators/user.validator");

const router = express.Router();

router.route("/").get(asyncMiddleware(controller.get));
router
  .route("/list")
  .get(validator.query(userList), asyncMiddleware(controller.list));

module.exports = router;
