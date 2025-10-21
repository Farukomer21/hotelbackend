const express = require("express");

// Reservation Db Object Rest Api Router
const reservationRouter = express.Router();

// add Reservation controllers

// createReservation controller
reservationRouter.post("/v1/reservations", require("./create-reservation-api"));
// getReservationById controller
reservationRouter.get(
  "/v1/reservations/:reservationId",
  require("./get-reservation-api"),
);
// getReservationByCode controller
reservationRouter.get(
  "/v1/reservationbycode/:reservationId",
  require("./get-reservationbycode-api"),
);
// updateReservation controller
reservationRouter.patch(
  "/v1/reservations/:reservationId",
  require("./update-reservation-api"),
);
// cancelReservationByCode controller
reservationRouter.patch(
  "/v1/cancelreservationbycode/:reservationId",
  require("./cancel-reservationbycode-api"),
);
// deleteReservation controller
reservationRouter.delete(
  "/v1/reservations/:reservationId",
  require("./delete-reservation-api"),
);
// listReservations controller
reservationRouter.get("/v1/reservations", require("./list-reservations-api"));

module.exports = reservationRouter;
