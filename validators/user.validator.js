const Joi = require("joi");

module.exports = {
  // GET /api/user/list
  userList: Joi.object({
    page: Joi.number().min(1).optional().default(1),
    limit: Joi.number().min(1).max(10).optional().default(10),
  }),

  userId: Joi.object({
    id: Joi.number().integer().min(1).required(),
  }),

  userUpdate: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().optional(),
    password: Joi.string().min(6).required(),
  }),
};
