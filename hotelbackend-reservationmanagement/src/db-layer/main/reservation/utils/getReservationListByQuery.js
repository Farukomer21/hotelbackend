const { HttpServerError, BadRequestError } = require("common");

const { Reservation } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReservationListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reservation = await Reservation.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!reservation || reservation.length === 0) return [];

    //      if (!reservation || reservation.length === 0) {
    //      throw new NotFoundError(
    //      `Reservation with the specified criteria not found`
    //  );
    //}

    return reservation.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationListByQuery",
      err,
    );
  }
};

module.exports = getReservationListByQuery;
