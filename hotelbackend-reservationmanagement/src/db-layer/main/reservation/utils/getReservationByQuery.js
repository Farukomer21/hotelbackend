const { HttpServerError, BadRequestError } = require("common");

const { Reservation } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReservationByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reservation = await Reservation.findOne({
      where: query,
    });

    if (!reservation) return null;
    return reservation.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationByQuery",
      err,
    );
  }
};

module.exports = getReservationByQuery;
