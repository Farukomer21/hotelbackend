const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { Reservation } = require("models");
const { Op } = require("sequelize");

const getReservationByReservationCode = async (reservationCode) => {
  try {
    const reservation = await Reservation.findOne({
      where: {
        reservationCode: reservationCode,
        isActive: true,
      },
    });

    if (!reservation) {
      return null;
    }
    return reservation.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationByReservationCode",
      err,
    );
  }
};

module.exports = getReservationByReservationCode;
