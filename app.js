const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const strategies = require("./shared/passport");
const errorHandler = require("./middlewares/error");
const swagger = require("./middlewares/swagger.js");

const routes = require("./routes/index");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use("jwt", strategies.jwt);

app.use("/api", cors(), routes);

swagger.setup(app);

app.use(errorHandler.notFound);
app.use(errorHandler.validation);
app.use(errorHandler.handler);

const port = 3001;

app.listen(port);

module.exports = app;
