const { HttpServerError } = require("common");

const { Room } = require("models");
const { Op } = require("sequelize");

const updateRoomByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Room.update(dataClause, options);
    const roomIdList = rows.map((item) => item.id);
    return roomIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingRoomByIdList", err);
  }
};

module.exports = updateRoomByIdList;
