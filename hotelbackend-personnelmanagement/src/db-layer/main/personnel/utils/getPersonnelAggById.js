const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Personnel } = require("models");
const { Op } = require("sequelize");

const getPersonnelAggById = async (personnelId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const personnel = Array.isArray(personnelId)
      ? await Personnel.findAll({
          where: {
            id: { [Op.in]: personnelId },
            isActive: true,
          },
          include: includes,
        })
      : await Personnel.findOne({
          where: {
            id: personnelId,
            isActive: true,
          },
          include: includes,
        });

    if (!personnel) {
      return null;
    }

    const personnelData =
      Array.isArray(personnelId) && personnelId.length > 0
        ? personnel.map((item) => item.getData())
        : personnel.getData();
    await Personnel.getCqrsJoins(personnelData);
    return personnelData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPersonnelAggById",
      err,
    );
  }
};

module.exports = getPersonnelAggById;
