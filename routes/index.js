const express = require("express");
const userRoutes = require("./user.route");

const router = express.Router();

router.get("/hello", (req, res) => res.send("Hello!"));

router.use("/user", userRoutes);

module.exports = router;
