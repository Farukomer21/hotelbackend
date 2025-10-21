const express = require("express");
const router = express.Router();

const httpLogsRoute = require("./httpLogs.route.js");
router.use("/logs", httpLogsRoute);

const dynamicRoute = require("./dynamic.route.js");
router.use("/", dynamicRoute);

module.exports = router;
