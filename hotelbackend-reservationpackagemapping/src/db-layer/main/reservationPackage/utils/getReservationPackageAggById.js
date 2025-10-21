const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { ReservationPackage } = require("models");
const { Op } = require("sequelize");

const getReservationPackageAggById = async (reservationPackageId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const reservationPackage = Array.isArray(reservationPackageId)
      ? await ReservationPackage.findAll({
          where: {
            id: { [Op.in]: reservationPackageId },
            isActive: true,
          },
          include: includes,
        })
      : await ReservationPackage.findOne({
          where: {
            id: reservationPackageId,
            isActive: true,
          },
          include: includes,
        });

    if (!reservationPackage) {
      return null;
    }

    const reservationPackageData =
      Array.isArray(reservationPackageId) && reservationPackageId.length > 0
        ? reservationPackage.map((item) => item.getData())
        : reservationPackage.getData();
    await ReservationPackage.getCqrsJoins(reservationPackageData);
    return reservationPackageData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationPackageAggById",
      err,
    );
  }
};

module.exports = getReservationPackageAggById;
