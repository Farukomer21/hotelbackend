const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { ReservationPackage } = require("models");
const { Op } = require("sequelize");

const getIdListOfReservationPackageByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const options = {
      where: { isActive: true },
      attributes: ["id"],
    };
    if (fieldName) {
      options.where = isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true };
    }

    let reservationPackageIdList = await ReservationPackage.findAll(options);

    if (!reservationPackageIdList) {
      throw new NotFoundError(
        `ReservationPackage with the specified criteria not found`,
      );
    }

    reservationPackageIdList = reservationPackageIdList.map((item) => item.id);
    return reservationPackageIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationPackageIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfReservationPackageByField;
