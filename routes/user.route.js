const express = require("express");
const controller = require("../controllers/user.controller");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const { authorize } = require("../middlewares/auth");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  userList,
  userId,
  userUpdate,
} = require("../validators/user.validator");
const { userRegister } = require("../validators/auth.validator");

const router = express.Router();

router
  .route("/list")
  .get(validator.query(userList), asyncMiddleware(controller.list));

router
  .route("")
  .post(validator.body(userRegister), asyncMiddleware(controller.register));

router
  .route("/:id")
  .get(validator.params(userId), asyncMiddleware(controller.get));

router
  .route("/:id")
  .put(
    validator.params(userId),
    validator.body(userUpdate),
    asyncMiddleware(controller.update)
  );

router
  .route("/:id")
  .delete(
    authorize(),
    validator.params(userId),
    asyncMiddleware(controller.delete)
  );

module.exports = router;
