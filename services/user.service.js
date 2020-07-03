const dbAsync = require("../utils/dbAsync");
const ApiError = require("../utils/apiError");
const _ = require("lodash");
const httpStatus = require("http-status");

exports.create = async (model) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const { firstname, lastname, email, age, password } = model;

  const newUserQuery = `INSERT INTO user (firstname, lastname, email, age, password) 
                        VALUES ('${firstname}', '${lastname}', '${email}', ${age}, '${password}')`;
  const createdUserQuery = `SELECT * FROM user WHERE id=?`;

  let user;
  try {
    await checkEmail(email);

    const result = await dbAsync.queryAsync(connection, newUserQuery);
    [user] = await dbAsync.queryAsync(connection, createdUserQuery, [
      result.insertId,
    ]);
  } catch (err) {
    throw new ApiError(err);
  } finally {
    pool.end();
    connection.release();
  }

  return { user };
};

exports.getById = async (id) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const query = `SELECT * FROM user WHERE id=${id}`;

  try {
    const [user] = await dbAsync.queryAsync(connection, query);

    if (_.isEmpty(user)) {
      throw new ApiError({
        message: "User id is not found",
        status: httpStatus.NOT_FOUND,
      });
    }

    return user;
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

const checkEmail = async (email) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const query = `SELECT * FROM user WHERE email LIKE('${email}')`;

  try {
    const [user] = await dbAsync.queryAsync(connection, query);

    if (!_.isEmpty(user)) {
      throw new ApiError({
        message: "User with same email already is already exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    return user;
  } catch (err) {
    throw new ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

exports.update = async (model) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const { id, firstname, lastname, email, age, password } = model;

  await this.getById(id);

  const updateQuery = `UPDATE user 
                      SET
                        firstname = '${firstname}', 
                        lastname = '${lastname}',
                        email = '${email}',
                        age = ${age},
                        password = '${password}' 
                      WHERE
                        id = ${id};`;

  try {
    await dbAsync.queryAsync(connection, updateQuery);
    return await this.getById(id);
  } catch (err) {
    throw ApiError(err);
  } finally {
    connection.release();
    pool.end();
  }
};

exports.delete = async (id) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  await this.getById(id);

  const query = `DELETE FROM user WHERE id=${id}`;

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

exports.list = async (page, limit) => {
  const { connection, pool } = await dbAsync.getConnectionAsync();

  const offset = (page - 1) * limit;

  const getUsersQuery = `SELECT * FROM user
                        LIMIT ${limit} OFFSET ${offset}`;

  try {
    const userList = await dbAsync.queryAsync(connection, getUsersQuery);
    return userList;
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
    pool.end();
  }
};
