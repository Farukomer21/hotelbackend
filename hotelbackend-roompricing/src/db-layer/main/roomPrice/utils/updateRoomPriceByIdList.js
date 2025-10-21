const { HttpServerError } = require("common");

const { RoomPrice } = require("models");
const { Op } = require("sequelize");

const updateRoomPriceByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await RoomPrice.update(dataClause, options);
    const roomPriceIdList = rows.map((item) => item.id);
    return roomPriceIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingRoomPriceByIdList",
      err,
    );
  }
};

module.exports = updateRoomPriceByIdList;
