const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { SpecialRequest } = require("models");
const { Op } = require("sequelize");

const getSpecialRequestAggById = async (specialRequestId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const specialRequest = Array.isArray(specialRequestId)
      ? await SpecialRequest.findAll({
          where: {
            id: { [Op.in]: specialRequestId },
            isActive: true,
          },
          include: includes,
        })
      : await SpecialRequest.findOne({
          where: {
            id: specialRequestId,
            isActive: true,
          },
          include: includes,
        });

    if (!specialRequest) {
      return null;
    }

    const specialRequestData =
      Array.isArray(specialRequestId) && specialRequestId.length > 0
        ? specialRequest.map((item) => item.getData())
        : specialRequest.getData();
    await SpecialRequest.getCqrsJoins(specialRequestData);
    return specialRequestData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSpecialRequestAggById",
      err,
    );
  }
};

module.exports = getSpecialRequestAggById;
