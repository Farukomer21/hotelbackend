const ReservationManagementServiceGrpcController = require("./ReservationManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new ReservationManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
