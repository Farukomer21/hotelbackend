const { HttpServerError, BadRequestError } = require("common");

const { Package_ } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPackage_ByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const package_ = await Package_.findOne({
      where: query,
    });

    if (!package_) return null;
    return package_.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPackage_ByQuery",
      err,
    );
  }
};

module.exports = getPackage_ByQuery;
