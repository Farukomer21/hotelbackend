const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const { Guest } = require("models");
const { Op } = require("sequelize");

const getGuestAggById = async (guestId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const guest = Array.isArray(guestId)
      ? await Guest.findAll({
          where: {
            id: { [Op.in]: guestId },
            isActive: true,
          },
          include: includes,
        })
      : await Guest.findOne({
          where: {
            id: guestId,
            isActive: true,
          },
          include: includes,
        });

    if (!guest) {
      return null;
    }

    const guestData =
      Array.isArray(guestId) && guestId.length > 0
        ? guest.map((item) => item.getData())
        : guest.getData();
    await Guest.getCqrsJoins(guestData);
    return guestData;
  } catch (err) {
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingGuestAggById", err);
  }
};

module.exports = getGuestAggById;
