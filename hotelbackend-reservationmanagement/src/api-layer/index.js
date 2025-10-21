module.exports = {
  ReservationManagementServiceManager: require("./service-manager/ReservationManagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Reservation Db Object
  CreateReservationManager: require("./main/reservation/create-reservation-api"),
  GetReservationByIdManager: require("./main/reservation/get-reservation-api"),
  GetReservationByCodeManager: require("./main/reservation/get-reservationbycode-api"),
  UpdateReservationManager: require("./main/reservation/update-reservation-api"),
  CancelReservationByCodeManager: require("./main/reservation/cancel-reservationbycode-api"),
  DeleteReservationManager: require("./main/reservation/delete-reservation-api"),
  ListReservationsManager: require("./main/reservation/list-reservations-api"),
  integrationRouter: require("./integrations/testRouter"),
};
