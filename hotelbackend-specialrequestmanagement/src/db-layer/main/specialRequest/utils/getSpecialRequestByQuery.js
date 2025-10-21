const { HttpServerError, BadRequestError } = require("common");

const { SpecialRequest } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getSpecialRequestByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const specialRequest = await SpecialRequest.findOne({
      where: query,
    });

    if (!specialRequest) return null;
    return specialRequest.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSpecialRequestByQuery",
      err,
    );
  }
};

module.exports = getSpecialRequestByQuery;
