const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { Room } = require("models");
const { Op } = require("sequelize");

const getIdListOfRoomByField = async (fieldName, fieldValue, isArray) => {
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

    let roomIdList = await Room.findAll(options);

    if (!roomIdList) {
      throw new NotFoundError(`Room with the specified criteria not found`);
    }

    roomIdList = roomIdList.map((item) => item.id);
    return roomIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRoomIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfRoomByField;
