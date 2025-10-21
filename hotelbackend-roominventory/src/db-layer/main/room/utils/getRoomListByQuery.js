const { HttpServerError, BadRequestError } = require("common");

const { Room } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getRoomListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const room = await Room.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!room || room.length === 0) return [];

    //      if (!room || room.length === 0) {
    //      throw new NotFoundError(
    //      `Room with the specified criteria not found`
    //  );
    //}

    return room.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRoomListByQuery",
      err,
    );
  }
};

module.exports = getRoomListByQuery;
