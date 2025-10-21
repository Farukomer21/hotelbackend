const { HttpServerError, BadRequestError } = require("common");

const { Personnel } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPersonnelByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const personnel = await Personnel.findOne({
      where: query,
    });

    if (!personnel) return null;
    return personnel.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPersonnelByQuery",
      err,
    );
  }
};

module.exports = getPersonnelByQuery;
