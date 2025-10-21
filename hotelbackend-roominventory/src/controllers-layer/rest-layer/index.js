const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  RoomInventoryServiceRestController: require("./RoomInventoryServiceRestController"),
  ...sessionRouter,
};
