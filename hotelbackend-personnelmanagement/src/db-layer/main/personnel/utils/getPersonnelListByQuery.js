const { HttpServerError, BadRequestError } = require("common");

const { Personnel } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getPersonnelListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const personnel = await Personnel.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!personnel || personnel.length === 0) return [];

    //      if (!personnel || personnel.length === 0) {
    //      throw new NotFoundError(
    //      `Personnel with the specified criteria not found`
    //  );
    //}

    return personnel.map((item) => item.getData());
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingPersonnelListByQuery",
      err,
    );
  }
};

module.exports = getPersonnelListByQuery;
