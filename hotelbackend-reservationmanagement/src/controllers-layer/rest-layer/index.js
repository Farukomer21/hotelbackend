const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  ReservationManagementServiceRestController: require("./ReservationManagementServiceRestController"),
  ...sessionRouter,
};
