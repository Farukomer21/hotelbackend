const express = require("express");

// ReservationPackage Db Object Rest Api Router
const reservationPackageRouter = express.Router();

// add ReservationPackage controllers

// createReservationPackage controller
reservationPackageRouter.post(
  "/v1/reservationpackages",
  require("./create-reservationpackage-api"),
);
// updateReservationPackage controller
reservationPackageRouter.patch(
  "/v1/reservationpackages/:reservationPackageId",
  require("./update-reservationpackage-api"),
);
// deleteReservationPackage controller
reservationPackageRouter.delete(
  "/v1/reservationpackages/:reservationPackageId",
  require("./delete-reservationpackage-api"),
);
// getReservationPackage controller
reservationPackageRouter.get(
  "/v1/reservationpackages/:reservationPackageId",
  require("./get-reservationpackage-api"),
);
// listReservationPackages controller
reservationPackageRouter.get(
  "/v1/reservationpackages",
  require("./list-reservationpackages-api"),
);

module.exports = reservationPackageRouter;
