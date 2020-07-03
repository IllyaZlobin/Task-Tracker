const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const taskRoutes = require("./task.route");

const router = express.Router();

router.get("/hello", (req, res) => res.send("Hello!"));

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/task", taskRoutes);

module.exports = router;
