const Joi = require("joi");

module.exports = {
  //POST /api/auth/login
  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  //POST /api/auth/register
  userRegister: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().optional(),
    password: Joi.string().min(6).required(),
  }),
};
