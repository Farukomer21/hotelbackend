const { HttpServerError, BadRequestError } = require("common");

const { Reservation } = require("models");
const { Op } = require("sequelize");

const updateReservationByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await Reservation.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingReservationByQuery",
      err,
    );
  }
};

module.exports = updateReservationByQuery;
