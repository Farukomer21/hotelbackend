const { HttpServerError } = require("common");

const { Guest } = require("models");
const { Op } = require("sequelize");

const updateGuestByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Guest.update(dataClause, options);
    const guestIdList = rows.map((item) => item.id);
    return guestIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingGuestByIdList", err);
  }
};

module.exports = updateGuestByIdList;
