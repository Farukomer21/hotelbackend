const { HttpServerError, BadRequestError } = require("common");

const { Room } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getRoomByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const room = await Room.findOne({
      where: query,
    });

    if (!room) return null;
    return room.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingRoomByQuery", err);
  }
};

module.exports = getRoomByQuery;
