const FeedbackManagementServiceRestController = require("./FeedbackManagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new FeedbackManagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
