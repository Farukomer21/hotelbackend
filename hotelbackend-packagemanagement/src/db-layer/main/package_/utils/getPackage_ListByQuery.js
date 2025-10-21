const { HttpServerError, BadRequestError } = require("common");

const { Package_ } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPackage_ListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const package_ = await Package_.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!package_ || package_.length === 0) return [];

    //      if (!package_ || package_.length === 0) {
    //      throw new NotFoundError(
    //      `Package_ with the specified criteria not found`
    //  );
    //}

    return package_.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackage_ListByQuery",
      err,
    );
  }
};

module.exports = getPackage_ListByQuery;
