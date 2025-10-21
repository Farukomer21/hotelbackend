const ReservationPackageMappingServiceRestController = require("./ReservationPackageMappingServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new ReservationPackageMappingServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
