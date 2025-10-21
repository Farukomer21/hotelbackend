const PaymentManagementServiceGrpcController = require("./PaymentManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new PaymentManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
