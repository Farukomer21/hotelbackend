const RoomInventoryServiceRestController = require("./RoomInventoryServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new RoomInventoryServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
