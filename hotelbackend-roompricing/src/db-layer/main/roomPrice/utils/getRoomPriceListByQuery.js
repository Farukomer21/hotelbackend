const { HttpServerError, BadRequestError } = require("common");

const { RoomPrice } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getRoomPriceListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const roomPrice = await RoomPrice.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!roomPrice || roomPrice.length === 0) return [];

    //      if (!roomPrice || roomPrice.length === 0) {
    //      throw new NotFoundError(
    //      `RoomPrice with the specified criteria not found`
    //  );
    //}

    return roomPrice.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRoomPriceListByQuery",
      err,
    );
  }
};

module.exports = getRoomPriceListByQuery;
