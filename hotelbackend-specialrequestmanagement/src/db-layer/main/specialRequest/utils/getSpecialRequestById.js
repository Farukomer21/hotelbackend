const { HttpServerError } = require("common");

let { SpecialRequest } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getSpecialRequestById = async (specialRequestId) => {
  try {
    const specialRequest = Array.isArray(specialRequestId)
      ? await SpecialRequest.findAll({
          where: {
            id: { [Op.in]: specialRequestId },
            isActive: true,
          },
        })
      : await SpecialRequest.findOne({
          where: {
            id: specialRequestId,
            isActive: true,
          },
        });

    if (!specialRequest) {
      return null;
    }
    return Array.isArray(specialRequestId)
      ? specialRequest.map((item) => item.getData())
      : specialRequest.getData();
  } catch (err) {
    console.log(err);
    //**errorLog
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingSpecialRequestById",
      err,
    );
  }
};

module.exports = getSpecialRequestById;
