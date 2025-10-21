const GuestManagementServiceRestController = require("./GuestManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new GuestManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
