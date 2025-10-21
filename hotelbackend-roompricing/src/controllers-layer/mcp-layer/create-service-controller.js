const RoomPricingServiceMcpController = require("./RoomPricingServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new RoomPricingServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
