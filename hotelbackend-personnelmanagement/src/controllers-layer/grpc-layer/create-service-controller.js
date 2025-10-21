const PersonnelManagementServiceGrpcController = require("./PersonnelManagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new PersonnelManagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
