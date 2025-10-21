module.exports = {
  CreateReservationManager: require("./create-reservation-api"),
  GetReservationByIdManager: require("./get-reservation-api"),
  GetReservationByCodeManager: require("./get-reservationbycode-api"),
  UpdateReservationManager: require("./update-reservation-api"),
  CancelReservationByCodeManager: require("./cancel-reservationbycode-api"),
  DeleteReservationManager: require("./delete-reservation-api"),
  ListReservationsManager: require("./list-reservations-api"),
};
