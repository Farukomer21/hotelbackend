const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  FeedbackManagementServiceRestController: require("./FeedbackManagementServiceRestController"),
  ...sessionRouter,
};
