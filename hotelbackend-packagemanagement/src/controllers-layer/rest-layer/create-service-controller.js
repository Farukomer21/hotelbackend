const PackageManagementServiceRestController = require("./PackageManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new PackageManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
