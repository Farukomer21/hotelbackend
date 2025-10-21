const { HttpServerError } = require("common");

let { Reservation } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getReservationById = async (reservationId) => {
  try {
    const reservation = Array.isArray(reservationId)
      ? await Reservation.findAll({
          where: {
            id: { [Op.in]: reservationId },
            isActive: true,
          },
        })
      : await Reservation.findOne({
          where: {
            id: reservationId,
            isActive: true,
          },
        });

    if (!reservation) {
      return null;
    }
    return Array.isArray(reservationId)
      ? reservation.map((item) => item.getData())
      : reservation.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationById",
      err,
    );
  }
};

module.exports = getReservationById;
