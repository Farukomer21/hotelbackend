const { HttpServerError, BadRequestError } = require("common");

const { Guest } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getGuestByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const guest = await Guest.findOne({
      where: query,
    });

    if (!guest) return null;
    return guest.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingGuestByQuery", err);
  }
};

module.exports = getGuestByQuery;
