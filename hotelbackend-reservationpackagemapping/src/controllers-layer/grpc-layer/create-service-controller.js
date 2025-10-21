const ReservationPackageMappingServiceGrpcController = require("./ReservationPackageMappingServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new ReservationPackageMappingServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
