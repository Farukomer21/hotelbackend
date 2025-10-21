const FeedbackManagementServiceMcpController = require("./FeedbackManagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new FeedbackManagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
