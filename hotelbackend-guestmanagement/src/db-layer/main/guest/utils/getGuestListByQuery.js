const { HttpServerError, BadRequestError } = require("common");

const { Guest } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getGuestListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const guest = await Guest.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!guest || guest.length === 0) return [];

    //      if (!guest || guest.length === 0) {
    //      throw new NotFoundError(
    //      `Guest with the specified criteria not found`
    //  );
    //}

    return guest.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingGuestListByQuery",
      err,
    );
  }
};

module.exports = getGuestListByQuery;
