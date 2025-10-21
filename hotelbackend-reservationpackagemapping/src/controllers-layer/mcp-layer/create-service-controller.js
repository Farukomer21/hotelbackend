const ReservationPackageMappingServiceMcpController = require("./ReservationPackageMappingServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new ReservationPackageMappingServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
