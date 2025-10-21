const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  GuestManagementServiceRestController: require("./GuestManagementServiceRestController"),
  ...sessionRouter,
};
