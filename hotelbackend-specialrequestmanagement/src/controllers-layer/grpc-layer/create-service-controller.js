const SpecialRequestManagementServiceGrpcController = require("./SpecialRequestManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new SpecialRequestManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
