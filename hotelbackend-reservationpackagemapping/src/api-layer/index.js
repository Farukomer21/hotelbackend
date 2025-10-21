module.exports = {
  ReservationPackageMappingServiceManager: require("./service-manager/ReservationPackageMappingServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // ReservationPackage Db Object
  CreateReservationPackageManager: require("./main/reservationPackage/create-reservationpackage-api"),
  UpdateReservationPackageManager: require("./main/reservationPackage/update-reservationpackage-api"),
  DeleteReservationPackageManager: require("./main/reservationPackage/delete-reservationpackage-api"),
  GetReservationPackageManager: require("./main/reservationPackage/get-reservationpackage-api"),
  ListReservationPackagesManager: require("./main/reservationPackage/list-reservationpackages-api"),
  integrationRouter: require("./integrations/testRouter"),
};
