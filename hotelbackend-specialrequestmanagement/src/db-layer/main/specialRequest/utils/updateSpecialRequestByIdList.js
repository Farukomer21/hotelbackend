const { HttpServerError } = require("common");

const { SpecialRequest } = require("models");
const { Op } = require("sequelize");

const updateSpecialRequestByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await SpecialRequest.update(dataClause, options);
    const specialRequestIdList = rows.map((item) => item.id);
    return specialRequestIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingSpecialRequestByIdList",
      err,
    );
  }
};

module.exports = updateSpecialRequestByIdList;
