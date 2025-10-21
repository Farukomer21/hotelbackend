const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { RoomPrice } = require("models");
const { Op } = require("sequelize");

const getRoomPriceAggById = async (roomPriceId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const roomPrice = Array.isArray(roomPriceId)
      ? await RoomPrice.findAll({
          where: {
            id: { [Op.in]: roomPriceId },
            isActive: true,
          },
          include: includes,
        })
      : await RoomPrice.findOne({
          where: {
            id: roomPriceId,
            isActive: true,
          },
          include: includes,
        });

    if (!roomPrice) {
      return null;
    }

    const roomPriceData =
      Array.isArray(roomPriceId) && roomPriceId.length > 0
        ? roomPrice.map((item) => item.getData())
        : roomPrice.getData();
    await RoomPrice.getCqrsJoins(roomPriceData);
    return roomPriceData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRoomPriceAggById",
      err,
    );
  }
};

module.exports = getRoomPriceAggById;
