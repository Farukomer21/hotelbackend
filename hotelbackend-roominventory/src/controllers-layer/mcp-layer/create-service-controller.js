const RoomInventoryServiceMcpController = require("./RoomInventoryServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new RoomInventoryServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
