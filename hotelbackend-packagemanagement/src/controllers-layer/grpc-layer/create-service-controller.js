const PackageManagementServiceGrpcController = require("./PackageManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new PackageManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
