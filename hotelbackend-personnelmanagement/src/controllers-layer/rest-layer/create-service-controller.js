const PersonnelManagementServiceRestController = require("./PersonnelManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new PersonnelManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
