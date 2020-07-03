const express = require("express");
const controller = require("../controllers/auth.controller");
const asyncMiddleware = require("../middlewares/asyncMiddleware");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const { userLogin, userRegister } = require("../validators/auth.validator");

const router = express.Router();

router
  .route("/login")
  .post(validator.body(userLogin), asyncMiddleware(controller.login));

router
  .route("/register")
  .post(validator.body(userRegister), asyncMiddleware(controller.register));

module.exports = router;
