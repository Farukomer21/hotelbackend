const { HttpServerError } = require("common");

const { Personnel } = require("models");
const { Op } = require("sequelize");

const updatePersonnelByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Personnel.update(dataClause, options);
    const personnelIdList = rows.map((item) => item.id);
    return personnelIdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingPersonnelByIdList",
      err,
    );
  }
};

module.exports = updatePersonnelByIdList;
