const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  ReservationPackageMappingServiceRestController: require("./ReservationPackageMappingServiceRestController"),
  ...sessionRouter,
};
