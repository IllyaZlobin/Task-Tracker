const passport = require("passport");
const { promisify } = require("es6-promisify");
const ApiError = require("../utils/apiError");
const httpStatus = require('http-status');

const handleToken = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  const logIn = promisify(req.logIn);

  const apiError = new ApiError({
    message: error ? error.message : "Unauthorized",
    status: httpStatus.UNAUTHORIZED,
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  req.user = user;
  return next();
};

exports.authorize = () => (req, res, next) => {
  passport.authenticate("jwt", { session: false }, handleToken(req, res, next))(
    req,
    res,
    next
  );
};
