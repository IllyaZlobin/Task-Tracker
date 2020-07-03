const Joi = require("joi");
const { orderTask } = require("../utils/orderTask");

module.exports = {
  createTask: Joi.object({
    title: Joi.strict().required(),
    description: Joi.strict().required(),
    status: Joi.string()
      .valid(...Object.keys(orderTask))
      .required(),
  }),

  updateTask: Joi.object({
    title: Joi.strict().required(),
    description: Joi.strict().required(),
    status: Joi.string()
      .valid(...Object.keys(orderTask))
      .required(),
    userId: Joi.number().integer().min(1).optional().default(null),
  }),

  taskId: Joi.object({
    id: Joi.number().integer().min(1).required(),
  }),

  userId: Joi.object({
    userId: Joi.number().integer().min(1).required(),
  }),

  changeTaskStatus: Joi.object({
    status: Joi.string()
      .valid(...Object.keys(orderTask))
      .required(),
  }),

  taskList: Joi.object({
    status: Joi.string()
      .valid(...Object.keys(orderTask))
      .optional()
      .default(orderTask.VIEW),
    order: Joi.string().valid(["ASC", "DESC"]).optional().default("ASC"),
  }),
};
