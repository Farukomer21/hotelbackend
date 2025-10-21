const { HttpServerError, BadRequestError } = require("common");

const { Personnel } = require("models");
const { Op } = require("sequelize");

const updatePersonnelByQuery = async (dataClause, query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    let rowsCount = null;
    let rows = null;

    const options = { where: { query, isActive: true }, returning: true };

    [rowsCount, rows] = await Personnel.update(dataClause, options);

    if (!rowsCount) return [];
    return rows.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingPersonnelByQuery",
      err,
    );
  }
};

module.exports = updatePersonnelByQuery;
