const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  RoomPricingServiceRestController: require("./RoomPricingServiceRestController"),
  ...sessionRouter,
};
