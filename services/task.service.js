const dbAsync = require("../utils/dbAsync");
const ApiError = require("../utils/apiError");
const _ = require("lodash");
const httpStatus = require("http-status");
const userService = require("./user.service");

exports.create = async (model) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const { title, description, status, userId } = model;

  const newTaskQuery = `INSERT INTO task (title, description, status, userId)
                        VALUES ('${title}', '${description}', '${status}', ${userId});`;

  const createdTaskQuery = `SELECT * FROM task WHERE id=?`;

  let result;
  let task;

  try {
    result = await dbAsync.queryAsync(connection, newTaskQuery);
    task = await dbAsync.queryAsync(connection, createdTaskQuery, [
      result.insertId,
    ]);
  } catch (err) {
    throw new ApiError(err);
  } finally {
    pool.end();
    connection.release();
  }

  return { task: task[0] };
};

exports.update = async (model) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const { id, title, description, status, userId } = model;

  await this.getById(id);
  await userService.getById(userId);

  const updateQuery = `UPDATE task 
                      SET
                        title = '${title}' ,
                        description = '${description}', 
                        status = '${status}', 
                        userId = ${userId} 
                      WHERE
                        id = ${id} `;

  try {
    await dbAsync.queryAsync(connection, updateQuery);
    return await this.getById(id);
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

exports.changeStatus = async (id, status) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  await this.getById(id);

  const changeStatusQuery = `UPDATE task 
                            SET
                              status = '${status}' 
                            WHERE
                              id = ${id} `;

  try {
    await dbAsync.queryAsync(connection, changeStatusQuery);
    return await this.getById(id);
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

exports.changeUser = async (id, userId) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  await this.getById(id);
  await userService.getById(userId);

  const changeUserQuery = `UPDATE task 
                            SET
                              userId = ${userId} 
                            WHERE
                              id = ${id} `;

  try {
    await dbAsync.queryAsync(connection, changeUserQuery);
    return await this.getById(id);
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

exports.delete = async (id) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  await this.getById(id);

  const query = `DELETE FROM user where id=${id}`;

  try {
    await dbAsync.queryAsync(connection, query);
    return { status: "deleted" };
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

exports.list = async (status, order) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const getTasksQuery = `SELECT
                          task.id AS id,
                          task.title AS title,
                          task.description AS description,
                          task.status AS status,
                          task.userId AS userId
                        FROM task
                          INNER JOIN user
                            ON task.userId = user.id
                        WHERE status = ('${status}')    
                        ORDER BY user.createdAt ${order}`;

  try {
    const tasks = await dbAsync.queryAsync(connection, getTasksQuery);
    return tasks;
  } catch (err) {
    throw new ApiError(err);
  } finally {
    pool.end();
    connection.release();
  }
};

exports.getById = async (id) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const query = `SELECT * FROM task WHERE id=${id}`;

  try {
    const result = await dbAsync.queryAsync(connection, query);
    const [task] = result;

    if (_.isEmpty(task)) {
      throw new ApiError({
        message: "Task id is not found",
        status: httpStatus.NOT_FOUND,
      });
    }

    return task;
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};
