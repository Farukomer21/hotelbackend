const { HttpServerError } = require("common");

const { ReservationPackage } = require("models");
const { Op } = require("sequelize");

const updateReservationPackageByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await ReservationPackage.update(dataClause, options);
    const reservationPackageIdList = rows.map((item) => item.id);
    return reservationPackageIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingReservationPackageByIdList",
      err,
    );
  }
};

module.exports = updateReservationPackageByIdList;
