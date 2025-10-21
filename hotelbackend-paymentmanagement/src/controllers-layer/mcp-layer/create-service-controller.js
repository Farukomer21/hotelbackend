const PaymentManagementServiceMcpController = require("./PaymentManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new PaymentManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
