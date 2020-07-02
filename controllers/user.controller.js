const dbAsync = require("../utils/dbAsync");

/**
 * @swagger
 * tags:
 *   name: [UserController]
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
  const { connection } = await dbAsync.getConnectionAsync();
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;

  try {
    const getUsersQuery = `SELECT * FROM user
                          LIMIT ${limit} OFFSET ${offset}`;

    const userList = await dbAsync.queryAsync(connection, getUsersQuery);

    res.status(200).send({ users: userList });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
