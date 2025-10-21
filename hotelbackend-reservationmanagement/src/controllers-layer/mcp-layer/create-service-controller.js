const ReservationManagementServiceMcpController = require("./ReservationManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new ReservationManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
