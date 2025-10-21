const GuestManagementServiceMcpController = require("./GuestManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new GuestManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
