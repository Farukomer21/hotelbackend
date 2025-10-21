const SpecialRequestManagementServiceRestController = require("./SpecialRequestManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new SpecialRequestManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
