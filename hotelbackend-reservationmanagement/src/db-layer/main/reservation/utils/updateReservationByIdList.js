const { HttpServerError } = require("common");

const { Reservation } = require("models");
const { Op } = require("sequelize");

const updateReservationByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Reservation.update(dataClause, options);
    const reservationIdList = rows.map((item) => item.id);
    return reservationIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingReservationByIdList",
      err,
    );
  }
};

module.exports = updateReservationByIdList;
