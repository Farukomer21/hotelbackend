const GuestManagementServiceGrpcController = require("./GuestManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new GuestManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
