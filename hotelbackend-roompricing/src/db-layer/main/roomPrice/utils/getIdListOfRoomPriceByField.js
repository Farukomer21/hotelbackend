const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { RoomPrice } = require("models");
const { Op } = require("sequelize");

const getIdListOfRoomPriceByField = async (fieldName, fieldValue, isArray) => {
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

    let roomPriceIdList = await RoomPrice.findAll(options);

    if (!roomPriceIdList) {
      throw new NotFoundError(
        `RoomPrice with the specified criteria not found`,
      );
    }

    roomPriceIdList = roomPriceIdList.map((item) => item.id);
    return roomPriceIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRoomPriceIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfRoomPriceByField;
