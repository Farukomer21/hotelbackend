const SpecialRequestManagementServiceMcpController = require("./SpecialRequestManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new SpecialRequestManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
