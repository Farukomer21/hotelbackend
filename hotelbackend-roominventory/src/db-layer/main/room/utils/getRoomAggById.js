const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Room } = require("models");
const { Op } = require("sequelize");

const getRoomAggById = async (roomId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const room = Array.isArray(roomId)
      ? await Room.findAll({
          where: {
            id: { [Op.in]: roomId },
            isActive: true,
          },
          include: includes,
        })
      : await Room.findOne({
          where: {
            id: roomId,
            isActive: true,
          },
          include: includes,
        });

    if (!room) {
      return null;
    }

    const roomData =
      Array.isArray(roomId) && roomId.length > 0
        ? room.map((item) => item.getData())
        : room.getData();
    await Room.getCqrsJoins(roomData);
    return roomData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingRoomAggById", err);
  }
};

module.exports = getRoomAggById;
