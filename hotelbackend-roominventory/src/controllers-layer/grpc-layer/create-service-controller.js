const RoomInventoryServiceGrpcController = require("./RoomInventoryServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new RoomInventoryServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
