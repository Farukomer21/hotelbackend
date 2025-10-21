const FeedbackManagementServiceGrpcController = require("./FeedbackManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new FeedbackManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
