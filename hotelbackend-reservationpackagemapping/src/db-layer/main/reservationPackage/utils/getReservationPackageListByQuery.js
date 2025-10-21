const { HttpServerError, BadRequestError } = require("common");

const { ReservationPackage } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReservationPackageListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reservationPackage = await ReservationPackage.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!reservationPackage || reservationPackage.length === 0) return [];

    //      if (!reservationPackage || reservationPackage.length === 0) {
    //      throw new NotFoundError(
    //      `ReservationPackage with the specified criteria not found`
    //  );
    //}

    return reservationPackage.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationPackageListByQuery",
      err,
    );
  }
};

module.exports = getReservationPackageListByQuery;
