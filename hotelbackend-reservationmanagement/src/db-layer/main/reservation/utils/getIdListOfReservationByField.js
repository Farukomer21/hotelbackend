const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Reservation } = require("models");
const { Op } = require("sequelize");

const getIdListOfReservationByField = async (
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

    let reservationIdList = await Reservation.findAll(options);

    if (!reservationIdList) {
      throw new NotFoundError(
        `Reservation with the specified criteria not found`,
      );
    }

    reservationIdList = reservationIdList.map((item) => item.id);
    return reservationIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReservationIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfReservationByField;
