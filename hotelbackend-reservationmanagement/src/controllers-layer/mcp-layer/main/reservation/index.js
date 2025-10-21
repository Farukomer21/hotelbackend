module.exports = (headers) => {
  // Reservation Db Object Rest Api Router
  const reservationMcpRouter = [];

  // createReservation controller
  reservationMcpRouter.push(require("./create-reservation-api")(headers));
  // getReservationById controller
  reservationMcpRouter.push(require("./get-reservation-api")(headers));
  // getReservationByCode controller
  reservationMcpRouter.push(require("./get-reservationbycode-api")(headers));
  // updateReservation controller
  reservationMcpRouter.push(require("./update-reservation-api")(headers));
  // cancelReservationByCode controller
  reservationMcpRouter.push(require("./cancel-reservationbycode-api")(headers));
  // deleteReservation controller
  reservationMcpRouter.push(require("./delete-reservation-api")(headers));
  // listReservations controller
  reservationMcpRouter.push(require("./list-reservations-api")(headers));

  return reservationMcpRouter;
};
