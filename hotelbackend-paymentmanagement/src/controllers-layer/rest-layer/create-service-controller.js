const PaymentManagementServiceRestController = require("./PaymentManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new PaymentManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
