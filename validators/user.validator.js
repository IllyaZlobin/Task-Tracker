const Joi = require("joi");

module.exports = {
  // GET /api/user/list
  userList: Joi.object({
    page: Joi.number().min(1).optional().default(1),
    limit: Joi.number().min(1).max(10).optional().default(10),
  }),
};
