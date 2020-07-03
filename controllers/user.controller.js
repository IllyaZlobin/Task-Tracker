const userService = require("../services/user.service");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   name: UserController
 *   description: User api
 */

/**
 * @swagger
 *   /api/user/list:
 *     get:
 *       produces:
 *         - application/json
 *       tags: [UserController]
 *       parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: number
 *             default: 1
 *         - in: query
 *           name: limit
 *           schema:
 *             type: number
 *             default: 10
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         firstname:
 *                           type: string
 *                         lastname:
 *                           type: string
 *                         email:
 *                           type: string
 *                         age:
 *                           type: number
 *                         password:
 *                           type: string
 *         400:
 *           description: 'Validation error'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         500:
 *           description: 'Server error'
 *           content:
 *             application/json:
 *              schema:
 *                type: object
 */
exports.list = async (req, res) => {
  const { page, limit } = req.query;

  const response = await userService.list(page, limit);

  return res.status(200).send({ users: response });
};

/**
 * @swagger
 * definitions:
 *   createUserRequest:
 *     type: object
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       age:
 *         type: number
 *     required:
 *       - firstname
 *       - lastname
 *       - email
 *       - password
 */
/**
 * @swagger
 * /api/user:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     tags: [UserController]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/createUserRequest'
 *     responses:
 *       200:
 *         description: 'Return status and created user'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     age:
 *                       type: number
 *                     password:
 *                       type: string
 *                     createdAt:
 *                       type: string
 */
exports.register = async (req, res) => {
  const { user } = await userService.create(req.body);

  return res.status(200).send({ status: "created", user });
};

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     produces:
 *       - application/json
 *     tags: [UserController]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: 'User id'
 *     responses:
 *       200:
 *         description: 'Return user object from database'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: number
 *                 password:
 *                   type: string
 *                 createdAt:
 *                   type: string
 */
exports.get = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  return res.status(200).send({ user });
};

/**
 * @swagger
 * definitions:
 *   updateUserRequest:
 *     type: object
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         minLength: 6
 *       age:
 *         type: number
 *     required:
 *       - firstname
 *       - lastname
 *       - email
 *       - password
 */
/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     tags: [UserController]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateUserRequest'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     age:
 *                       type: number
 *                     password:
 *                       type: string
 *                     createdAt:
 *                       type: string
 */
exports.update = async (req, res) => {
  const { id } = req.params;

  const user = await userService.update({ id, ...req.body });

  return res.status(200).send({ user });
};

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     description: Delete user from database
 *     security:
 *       - bearerAuth: []
 *     tags: [UserController]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  const response = await userService.delete(id);
  return res.status(200).send(response);
};
