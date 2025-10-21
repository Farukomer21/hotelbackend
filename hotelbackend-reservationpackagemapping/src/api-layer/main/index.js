module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // ReservationPackage Db Object
  CreateReservationPackageManager: require("./reservationPackage/create-reservationpackage-api"),
  UpdateReservationPackageManager: require("./reservationPackage/update-reservationpackage-api"),
  DeleteReservationPackageManager: require("./reservationPackage/delete-reservationpackage-api"),
  GetReservationPackageManager: require("./reservationPackage/get-reservationpackage-api"),
  ListReservationPackagesManager: require("./reservationPackage/list-reservationpackages-api"),
};
