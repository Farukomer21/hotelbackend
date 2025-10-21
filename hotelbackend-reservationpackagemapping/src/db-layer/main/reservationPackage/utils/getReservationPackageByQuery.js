const { HttpServerError, BadRequestError } = require("common");

const { ReservationPackage } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReservationPackageByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reservationPackage = await ReservationPackage.findOne({
      where: query,
    });

    if (!reservationPackage) return null;
    return reservationPackage.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationPackageByQuery",
      err,
    );
  }
};

module.exports = getReservationPackageByQuery;
