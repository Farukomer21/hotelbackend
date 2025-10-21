const { HttpServerError } = require("common");

let { RoomPrice } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getRoomPriceById = async (roomPriceId) => {
  try {
    const roomPrice = Array.isArray(roomPriceId)
      ? await RoomPrice.findAll({
          where: {
            id: { [Op.in]: roomPriceId },
            isActive: true,
          },
        })
      : await RoomPrice.findOne({
          where: {
            id: roomPriceId,
            isActive: true,
          },
        });

    if (!roomPrice) {
      return null;
    }
    return Array.isArray(roomPriceId)
      ? roomPrice.map((item) => item.getData())
      : roomPrice.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingRoomPriceById", err);
  }
};

module.exports = getRoomPriceById;
