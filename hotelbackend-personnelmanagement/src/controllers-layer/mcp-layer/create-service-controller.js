const PersonnelManagementServiceMcpController = require("./PersonnelManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new PersonnelManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
