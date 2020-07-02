const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

exports.notFound = (req, res, next) => {
  const error = new ApiError({
    message: "Not Found",
    status: httpStatus.NOT_FOUND,
  });

  return handler(error, req, res);
};
