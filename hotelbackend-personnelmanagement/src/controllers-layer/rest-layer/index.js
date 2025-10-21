const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  PersonnelManagementServiceRestController: require("./PersonnelManagementServiceRestController"),
  ...sessionRouter,
};
