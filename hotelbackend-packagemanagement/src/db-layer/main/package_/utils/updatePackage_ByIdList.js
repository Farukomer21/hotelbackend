const { HttpServerError } = require("common");

const { Package_ } = require("models");
const { Op } = require("sequelize");

const updatePackage_ByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await Package_.update(dataClause, options);
    const package_IdList = rows.map((item) => item.id);
    return package_IdList;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingPackage_ByIdList",
      err,
    );
  }
};

module.exports = updatePackage_ByIdList;
