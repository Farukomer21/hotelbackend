module.exports = (headers) => {
  // ReservationPackage Db Object Rest Api Router
  const reservationPackageMcpRouter = [];

  // createReservationPackage controller
  reservationPackageMcpRouter.push(
    require("./create-reservationpackage-api")(headers),
  );
  // updateReservationPackage controller
  reservationPackageMcpRouter.push(
    require("./update-reservationpackage-api")(headers),
  );
  // deleteReservationPackage controller
  reservationPackageMcpRouter.push(
    require("./delete-reservationpackage-api")(headers),
  );
  // getReservationPackage controller
  reservationPackageMcpRouter.push(
    require("./get-reservationpackage-api")(headers),
  );
  // listReservationPackages controller
  reservationPackageMcpRouter.push(
    require("./list-reservationpackages-api")(headers),
  );

  return reservationPackageMcpRouter;
};
