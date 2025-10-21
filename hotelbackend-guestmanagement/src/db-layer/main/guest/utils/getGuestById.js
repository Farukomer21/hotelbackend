const { HttpServerError } = require("common");

let { Guest } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getGuestById = async (guestId) => {
  try {
    const guest = Array.isArray(guestId)
      ? await Guest.findAll({
          where: {
            id: { [Op.in]: guestId },
            isActive: true,
          },
        })
      : await Guest.findOne({
          where: {
            id: guestId,
            isActive: true,
          },
        });

    if (!guest) {
      return null;
    }
    return Array.isArray(guestId)
      ? guest.map((item) => item.getData())
      : guest.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError("errMsg_dbErrorWhenRequestingGuestById", err);
  }
};

module.exports = getGuestById;
