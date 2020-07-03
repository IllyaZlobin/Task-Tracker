const tokenService = require("../services/token.service");
const userService = require("../services/user.service");

/**
 * @swagger
 * tags:
 *   name: AuthController
 *   description: Auth api
 */

/**
 * @swagger
 * definitions:
 *   loginRequest:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     required:
 *       - email
 *       - password
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     tags: [AuthController]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/loginRequest'
 *     responses:
 *       200:
 *         description: 'Return object which contain information about user and token'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: object
 *                   properties:
 *                     tokenType:
 *                       type: string
 *                     accessToken:
 *                       type: string
 *                     expiresIn:
 *                       type: string
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
 */
exports.login = async (req, res) => {
  const { user, accessToken } = await tokenService.findAndGenerateToken(
    req.body
  );

  const token = tokenService.tokenResponse(accessToken);

  return res.status(200).send({ token, user });
};

/**
 * @swagger
 * definitions:
 *   registerRequest:
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
 * /api/auth/register:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     tags: [AuthController]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/registerRequest'
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
