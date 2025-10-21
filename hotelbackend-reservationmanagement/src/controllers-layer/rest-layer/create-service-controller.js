const ReservationManagementServiceRestController = require("./ReservationManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new ReservationManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
