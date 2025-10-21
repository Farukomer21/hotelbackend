const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Reservation } = require("models");
const { Op } = require("sequelize");

const getReservationAggById = async (reservationId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const reservation = Array.isArray(reservationId)
      ? await Reservation.findAll({
          where: {
            id: { [Op.in]: reservationId },
            isActive: true,
          },
          include: includes,
        })
      : await Reservation.findOne({
          where: {
            id: reservationId,
            isActive: true,
          },
          include: includes,
        });

    if (!reservation) {
      return null;
    }

    const reservationData =
      Array.isArray(reservationId) && reservationId.length > 0
        ? reservation.map((item) => item.getData())
        : reservation.getData();
    await Reservation.getCqrsJoins(reservationData);
    return reservationData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationAggById",
      err,
    );
  }
};

module.exports = getReservationAggById;
