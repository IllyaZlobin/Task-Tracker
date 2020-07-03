const express = require("express");
const controller = require("../controllers/task.controller");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const { authorize } = require("../middlewares/auth");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const {
  createTask,
  updateTask,
  taskId,
  userId,
  changeTaskStatus,
  taskList
} = require("../validators/task.validator");

const router = express.Router();

router
  .route("")
  .post(
    authorize(),
    validator.body(createTask),
    asyncMiddleware(controller.create)
  );

router
  .route("/:id")
  .put(
    authorize(),
    validator.body(updateTask),
    validator.params(taskId),
    asyncMiddleware(controller.update)
  );

router
  .route("/:id/status")
  .put(
    authorize(),
    validator.query(changeTaskStatus),
    validator.params(taskId),
    asyncMiddleware(controller.changeStatus)
  );

router
  .route("/:id/user")
  .put(
    authorize(),
    validator.query(userId),
    validator.params(taskId),
    asyncMiddleware(controller.changeUser)
  );

router
  .route("/:id")
  .delete(
    authorize(),
    validator.params(taskId),
    asyncMiddleware(controller.delete)
  );

router
  .route("/list")
  .get(
    authorize(),
    validator.query(taskList),
    asyncMiddleware(controller.list)
  );  

module.exports = router;
