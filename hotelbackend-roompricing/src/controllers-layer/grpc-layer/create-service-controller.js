const RoomPricingServiceGrpcController = require("./RoomPricingServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new RoomPricingServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
