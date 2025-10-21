const PackageManagementServiceMcpController = require("./PackageManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new PackageManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
