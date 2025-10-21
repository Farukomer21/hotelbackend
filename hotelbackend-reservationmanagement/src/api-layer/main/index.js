module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Reservation Db Object
  CreateReservationManager: require("./reservation/create-reservation-api"),
  GetReservationByIdManager: require("./reservation/get-reservation-api"),
  GetReservationByCodeManager: require("./reservation/get-reservationbycode-api"),
  UpdateReservationManager: require("./reservation/update-reservation-api"),
  CancelReservationByCodeManager: require("./reservation/cancel-reservationbycode-api"),
  DeleteReservationManager: require("./reservation/delete-reservation-api"),
  ListReservationsManager: require("./reservation/list-reservations-api"),
};
