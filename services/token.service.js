const jwt = require("jwt-simple");
const dbAsync = require("../utils/dbAsync");
const moment = require("moment-timezone");
const config = require("config");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const _ = require("lodash");

const jwtExp = config.get("jwtExpirationInterval");
const secret = config.get("jwtSecret");

exports.generateToken = async (userId) => {
  const payload = {
    exp: moment().add(jwtExp, "minutes").unix(),
    iat: moment().unix(),
    sub: userId,
  };

  return jwt.encode(payload, secret, "HS256");
};

exports.findAndGenerateToken = async (options) => {
  const { connection } = await dbAsync.getConnectionAsync();
  const { email, password } = options;

  let user;
  let error;

  try {
    user = await dbAsync.queryAsync(
      connection,
      `Select * from user where email LIKE('${email}') AND password LIKE('${password}')`
    );
  } catch (err) {
    throw new ApiError(err.message);
  }
  error = {
    status: httpStatus.UNAUTHORIZED,
  };
  if (!_.isEmpty(user)) {
    const accessToken = await this.generateToken(user[0].id);
    return { user, accessToken };
  } else {
    error.message = "Incorrect email or password";
    error.status = httpStatus.BAD_REQUEST;

    throw new ApiError(error);
  }
};

exports.tokenResponse = (accessToken) => {
  const tokenType = "Bearer";
  const expiresIn = moment().add(jwtExp, "minutes");
  return {
    tokenType,
    accessToken,
    expiresIn,
  };
};
