const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  PackageManagementServiceRestController: require("./PackageManagementServiceRestController"),
  ...sessionRouter,
};
