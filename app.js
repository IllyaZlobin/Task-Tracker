const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swagger = require("./middlewares/swagger.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/", indexRouter);
app.use("/users", usersRouter);

swagger.setup(app);

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

const port = 3001;

app.listen(port);

module.exports = app;
