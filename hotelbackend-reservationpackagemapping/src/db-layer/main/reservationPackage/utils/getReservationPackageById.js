const { HttpServerError } = require("common");

let { ReservationPackage } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getReservationPackageById = async (reservationPackageId) => {
  try {
    const reservationPackage = Array.isArray(reservationPackageId)
      ? await ReservationPackage.findAll({
          where: {
            id: { [Op.in]: reservationPackageId },
            isActive: true,
          },
        })
      : await ReservationPackage.findOne({
          where: {
            id: reservationPackageId,
            isActive: true,
          },
        });

    if (!reservationPackage) {
      return null;
    }
    return Array.isArray(reservationPackageId)
      ? reservationPackage.map((item) => item.getData())
      : reservationPackage.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationPackageById",
      err,
    );
  }
};

module.exports = getReservationPackageById;
