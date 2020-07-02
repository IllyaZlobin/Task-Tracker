const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

module.exports = {
  setup,
};

function setup(app) {
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Task Tracker",
        version: "1.0.0",
      },
    },
    apis: ["./routes/*"], // Path to the API docs,
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.get("/api-docs.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
