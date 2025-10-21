const { HttpServerError } = require("common");

let { Room } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getRoomById = async (roomId) => {
  try {
    const room = Array.isArray(roomId)
      ? await Room.findAll({
          where: {
            id: { [Op.in]: roomId },
            isActive: true,
          },
        })
      : await Room.findOne({
          where: {
            id: roomId,
            isActive: true,
          },
        });

    if (!room) {
      return null;
    }
    return Array.isArray(roomId)
      ? room.map((item) => item.getData())
      : room.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingRoomById", err);
  }
};

module.exports = getRoomById;
