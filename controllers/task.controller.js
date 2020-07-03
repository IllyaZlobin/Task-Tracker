const { orderTask } = require("../utils/orderTask");
const taskService = require("../services/task.service");

/**
 * @swagger
 * tags:
 *   name: TaskController
 *   description: Task api
 */

/**
 * @swagger
 * definitions:
 *   createTaskRequest:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *         enum: ['VIEW', 'IN-PROGRESS', 'DONE']
 *     required:
 *       - title
 *       - description
 *       - status
 */
/**
 * @swagger
 * /api/task:
 *   post:
 *     description: Create new task
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - "application/json"
 *     tags: [TaskController]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/createTaskRequest'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     userId:
 *                       type: number
 */
exports.create = async (req, res) => {
  let { status, userId } = req.body;
  status = orderTask[status];
  userId = req.user.id;

  const response = await taskService.create({ ...req.body, status, userId });

  return res.status(200).send(response);
};

/**
 * @swagger
 * definitions:
 *   updateTaskRequest:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *         enum: ['VIEW', 'IN-PROGRESS', 'DONE']
 *       userId:
 *         type: number
 *     required:
 *       - title
 *       - description
 *       - status
 */
/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     description: Update task
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - "application/json"
 *     tags: [TaskController]
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
 *             $ref: '#/definitions/updateTaskRequest'
 *     responses:
 *       200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                task:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    title:
 *                      type: string
 *                    description:
 *                      type: string
 *                    status:
 *                      type: string
 *                    userId:
 *                      type: number
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  let { status } = req.body;

  status = orderTask[status];

  const response = await taskService.update({ ...req.body, status, id });

  return res.status(200).send({ task: response });
};

/**
 * @swagger
 * /api/task/{id}/status:
 *   put:
 *     description: Update task status
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     tags: [TaskController]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['VIEW', 'IN-PROGRESS', 'DONE']
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     userId:
 *                       type: number
 */
exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  let { status } = req.query;

  status = orderTask[status];

  const response = await taskService.changeStatus(id, status);

  return res.status(200).send({ task: response });
};

/**
 * @swagger
 * /api/task/{id}/user:
 *   put:
 *     description: Update user of task
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     tags: [TaskController]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     userId:
 *                       type: number
 */
exports.changeUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  const response = await taskService.changeUser(id, userId);

  return res.status(200).send({ task: response });
};

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     tags: [TaskController]
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
 *               properties:
 *                 status:
 *                   type: string
 */
exports.delete = async (req, res) => {
  const { id } = req.params;

  const response = await taskService.delete(id);

  return res.status(200).send(response);
};

/**
 * @swagger
 * /api/task/list:
 *   get:
 *     description: Get list of task. order by user created date.
 *     produces:
 *       - application/json:
 *     security:
 *       - bearerAuth: []
 *     tags: [TaskController]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['VIEW', 'IN-PROGRESS', 'DONE']
 *         required: true
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ['ASC', 'DESC']
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       userId:
 *                         type: number
 */
exports.list = async (req, res) => {
  let { status, order } = req.query;

  status = orderTask[status];

  const response = await taskService.list(status, order);

  return res.status(200).send({ tasks: response });
};
