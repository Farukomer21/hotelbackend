const { HttpServerError, BadRequestError } = require("common");

const { SpecialRequest } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSpecialRequestListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const specialRequest = await SpecialRequest.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!specialRequest || specialRequest.length === 0) return [];

    //      if (!specialRequest || specialRequest.length === 0) {
    //      throw new NotFoundError(
    //      `SpecialRequest with the specified criteria not found`
    //  );
    //}

    return specialRequest.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSpecialRequestListByQuery",
      err,
    );
  }
};

module.exports = getSpecialRequestListByQuery;
