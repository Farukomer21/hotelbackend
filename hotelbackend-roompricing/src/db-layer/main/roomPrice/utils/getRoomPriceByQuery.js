const { HttpServerError, BadRequestError } = require("common");

const { RoomPrice } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getRoomPriceByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const roomPrice = await RoomPrice.findOne({
      where: query,
    });

    if (!roomPrice) return null;
    return roomPrice.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRoomPriceByQuery",
      err,
    );
  }
};

module.exports = getRoomPriceByQuery;
